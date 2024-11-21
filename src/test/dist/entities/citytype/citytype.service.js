"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitytypeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dayjs = require("dayjs");
const Corporate_schema_1 = require("../../db/schemas/Corporate.schema");
const error_message_1 = require("../../constants/error_message");
const constants_1 = require("../../constants/constants");
const success_message_1 = require("../../constants/success_message");
const filters_1 = require("./services/filters");
const config_1 = require("../../services/config");
const types_1 = require("../../services/payments/types");
const CitytypeValidationService_1 = require("./services/CitytypeValidationService");
const CitytypeLocationService_1 = require("./services/CitytypeLocationService");
const CitytypeZoneService_1 = require("./services/CitytypeZoneService");
const types_2 = require("./services/types");
const TypeService_schema_1 = require("../../db/schemas/TypeService.schema");
let CitytypeService = class CitytypeService {
    constructor(cityTypeModel, citytypeValidationService, citytypeLocationService, citytypeZoneService, typesService) {
        this.cityTypeModel = cityTypeModel;
        this.citytypeValidationService = citytypeValidationService;
        this.citytypeLocationService = citytypeLocationService;
        this.citytypeZoneService = citytypeZoneService;
        this.typesService = typesService;
        this.lookupsQuery = {
            types: {
                $lookup: {
                    from: 'types',
                    localField: 'typeid',
                    foreignField: '_id',
                    as: 'type_details',
                },
            },
            cityType: {
                $lookup: {
                    from: 'city_types',
                    localField: 'car_rental_ids',
                    foreignField: '_id',
                    as: 'car_rental_list',
                },
            },
        };
        this.unwindQuery = {
            $unwind: '$type_details',
        };
    }
    async getCitytypeOptions(params, res) {
        const currentCityLatLong = [
            Number(params.body.latitude),
            Number(params.body.longitude),
        ];
        const country = params.body.country;
        const countryCode = params.body?.country_code ?? null;
        const id = params.body[params.clientType];
        const clientValidated = await this.citytypeValidationService.validateClient({
            id,
            clientType: params.clientType,
            token: params.body.token,
        });
        if (!clientValidated.status)
            return res.status(clientValidated.response.status).json({
                status: false,
                message: clientValidated.response.message,
            });
        const { data: clientData, userType } = clientValidated;
        const locationDataResponse = await this.citytypeLocationService.getLocationData({
            country,
            currentLocation: currentCityLatLong,
            countryCode,
        });
        if (!locationDataResponse.status)
            return res
                .status(locationDataResponse.response.status)
                .json(locationDataResponse.response);
        const { nearbyCityDetails } = locationDataResponse;
        if (!nearbyCityDetails)
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                status: false,
                message: 'No city and country found',
                error_code: error_message_1.errorMessages.ERROR_CODE_OUR_BUSINESS_NOT_IN_YOUR_COUNTRY,
            });
        const { finalCityId, finalCityDetails } = nearbyCityDetails;
        const { zoneInside: redZoneInside } = await this.citytypeZoneService.checkZones({
            cityId: finalCityId,
            currentLocation: currentCityLatLong,
            modelName: 'redZoneAreaModel',
        });
        if (redZoneInside)
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                status: false,
                message: 'The point is inside a red zone',
                error_code: error_message_1.errorMessages.ERROR_CODE_OUR_BUSINESS_NOT_IN_YOUR_CITY,
            });
        const specsAggCityType = this.buildCityTypePipeline({
            finalCityDetails,
            finalCityId,
            clientData,
            userType,
        });
        const { zoneInside: cityZoneInside } = await this.citytypeZoneService.checkZones({
            cityId: finalCityId,
            currentLocation: currentCityLatLong,
            modelName: 'cityZoneModel',
        });
        try {
            const cityTypesData = await this.cityTypeModel.aggregate(specsAggCityType);
            this.processCityTypes({ cityTypesData, cityZoneInside });
            let poolTypes = [];
            const settingDetail = config_1.settingsService.getSettingsData();
            if (settingDetail.is_allow_ride_share) {
                const availableShareCondition = {
                    $match: { is_ride_share: { $eq: 1 } },
                };
                const rrrModified = {
                    $redact: {
                        $cond: [
                            { $eq: ['$type_details.is_business', 1] },
                            '$$KEEP',
                            '$$PRUNE',
                        ],
                    },
                };
                const [countryIdCondition, cityIdCondition, , businessCondition] = specsAggCityType;
                const sort = specsAggCityType[specsAggCityType.length - 1];
                poolTypes = await this.cityTypeModel.aggregate([
                    countryIdCondition,
                    cityIdCondition,
                    businessCondition,
                    availableShareCondition,
                    this.lookupsQuery.types,
                    this.unwindQuery,
                    rrrModified,
                    sort,
                ]);
            }
            if (!cityTypesData.length && !poolTypes.length)
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    status: false,
                    message: 'No city types found',
                    error_code: error_message_1.errorMessages.ERROR_CODE_OUR_BUSINESS_NOT_IN_YOUR_CITY,
                });
            const corporateId = clientData.corporate_ids && clientData.corporate_ids.length
                ? clientData.corporate_ids[0].corporate_id
                : null;
            const corporateData = await Corporate_schema_1.CorporateModel.findOne({
                _id: corporateId,
            }).lean();
            const isCorporateRequest = corporateData &&
                clientData.corporate_ids[0].status ==
                    constants_1.constants.CORPORATE_REQUEST_ACCEPTED &&
                corporateData.is_approved
                ? true
                : false;
            const paymentTypes = (0, types_1.getPaymentTypes)();
            const currentTime = dayjs().toISOString();
            const response = {
                status: true,
                message: success_message_1.successMessage.MESSAGE_CODE_GET_CITYTYPE_LIST_SUCCESSFULLY,
                currency: 'Bs',
                currencycode: 'USD',
                city_detail: finalCityDetails,
                payment_gateway: paymentTypes,
                citytypes: cityTypesData,
                pooltypes: poolTypes,
                server_time: currentTime,
                is_corporate_request: isCorporateRequest,
            };
            return res.status(common_1.HttpStatus.OK).json({ response });
        }
        catch (error) {
            console.error('Error in getCitytypeOptions', error);
            const response = {
                status: false,
                message: 'Error in getCitytypeOptions',
            };
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(response);
        }
    }
    buildCityTypePipeline({ finalCityDetails, finalCityId, clientData, userType, }) {
        const sort = { $sort: {} };
        sort['$sort']['type_details.sequenceInt'] = 1;
        const countryIdCondition = {
            $match: { countryid: { $eq: finalCityDetails.countryid } },
        };
        const cityIdCondition = { $match: { cityid: { $eq: finalCityId } } };
        const businessCondition = { $match: { is_business: { $eq: 1 } } };
        const userTypePricingCondition = userType == constants_1.constants.CORPORATE_UNIQUE_NUMBER
            ? { $match: { user_type_id: { $eq: clientData.user_type_id } } }
            : { $match: { user_type: { $eq: 0 } } };
        const isRideShareCondition = {
            $match: { is_ride_share: { $ne: 1 } },
        };
        const rrr = {
            $redact: {
                $cond: [{ $eq: ['$type_details.is_business', 1] }, '$$KEEP', '$$PRUNE'],
            },
        };
        const convertSequenceInt = {
            $addFields: {
                'type_details.sequenceInt': { $toInt: '$type_details.sequence' },
            },
        };
        return [
            countryIdCondition,
            cityIdCondition,
            userTypePricingCondition,
            businessCondition,
            isRideShareCondition,
            this.lookupsQuery.types,
            this.unwindQuery,
            filters_1.filtersCityType.modelsType,
            filters_1.filtersCityType.capacityType,
            rrr,
            this.lookupsQuery.cityType,
            convertSequenceInt,
            sort,
        ];
    }
    processCityTypes({ cityTypesData, cityZoneInside }) {
        cityTypesData.forEach((cityType) => {
            if (cityZoneInside && cityType.rich_area_surge) {
                const zoneIndex = cityType.rich_area_surge.findIndex((area) => area.id?.toString() == cityZoneInside._id.toString());
                if (zoneIndex !== -1 &&
                    cityType.rich_area_surge[zoneIndex]?.surge_multiplier) {
                    cityType.rich_area_surge_multiplier =
                        cityType.rich_area_surge[zoneIndex].surge_multiplier;
                }
            }
            const carRentalList = cityType.car_rental_list;
            cityType.car_rental_list = [];
            if (cityType.is_car_rental_business) {
                carRentalList.forEach((carRental) => {
                    if (carRental.is_business) {
                        cityType.car_rental_list.push(carRental);
                    }
                });
            }
        });
    }
    async getCarsInfoByService(params, res) {
        if (!params.body?.serviceTypeId)
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                message: 'Type service id not found',
            });
        const currentCityLatLong = [
            Number(params.body.latitude),
            Number(params.body.longitude),
        ];
        const country = params.body.country;
        const countryCode = params.body?.country_code ?? null;
        const id = params.body[params.clientType];
        const clientValidated = await this.citytypeValidationService.validateClient({
            id,
            clientType: params.clientType,
            token: params.body.token,
        });
        if (!clientValidated.status)
            return res.status(clientValidated.response.status).json({
                status: false,
                message: clientValidated.response.message,
            });
        const { userType } = clientValidated;
        const locationDataResponse = await this.citytypeLocationService.getLocationData({
            country,
            currentLocation: currentCityLatLong,
            countryCode,
        });
        if (!locationDataResponse.status)
            return res
                .status(locationDataResponse.response.status)
                .json(locationDataResponse.response);
        const { nearbyCityDetails } = locationDataResponse;
        if (!nearbyCityDetails)
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                status: false,
                message: 'No city and country found',
                error_code: error_message_1.errorMessages.ERROR_CODE_OUR_BUSINESS_NOT_IN_YOUR_COUNTRY,
            });
        const { finalCityId: cityId } = nearbyCityDetails;
        const { zoneInside: redZoneInside } = await this.citytypeZoneService.checkZones({
            cityId,
            currentLocation: currentCityLatLong,
            modelName: 'redZoneAreaModel',
        });
        if (redZoneInside)
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                status: false,
                message: 'The point is inside a red zone',
                error_code: error_message_1.errorMessages.ERROR_CODE_OUR_BUSINESS_NOT_IN_YOUR_CITY,
            });
        try {
            const match = {
                $match: {
                    cityid: cityId,
                    is_business: 1,
                    user_type: parseInt(userType),
                },
            };
            const lookup = this.typesService.getLookupCarsTypesByServiceType({
                serviceTypeId: params.body?.serviceTypeId,
            });
            const unwind = {
                $unwind: '$typeInfo',
            };
            const fieldAdded = {
                $addFields: {
                    type: '$typeInfo',
                },
            };
            const project = {
                $project: {
                    _id: 1,
                    countryname: 1,
                    cityname: 1,
                    typeid: 1,
                    typename: 1,
                    type: 1,
                },
            };
            const services = await this.cityTypeModel.aggregate([
                match,
                lookup,
                unwind,
                fieldAdded,
                project,
            ]);
            return res.status(common_1.HttpStatus.OK).json({
                status: true,
                data: services,
            });
        }
        catch (error) {
            console.error('Error in getServiceTypes', error);
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                message: 'Error in get service types',
            });
        }
    }
    async getServicesbyType(params, res) {
        try {
            const services = await TypeService_schema_1.TypeServiceModel.find({})
                .select({ _id: 1, service_name: 1 })
                .lean();
            const response = {
                status: true,
                data: services.map((service) => ({
                    _id: service._id.toString(),
                    service_name: service.service_name,
                })),
            };
            return res.status(common_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            console.error('Error in getServiceTypes', error);
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                message: 'Error in get service types',
            });
        }
    }
};
exports.CitytypeService = CitytypeService;
exports.CitytypeService = CitytypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('CityType')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        CitytypeValidationService_1.CitytypeValidationService,
        CitytypeLocationService_1.CitytypeLocationService,
        CitytypeZoneService_1.CitytypeZoneService,
        types_2.TypesService])
], CitytypeService);
//# sourceMappingURL=citytype.service.js.map