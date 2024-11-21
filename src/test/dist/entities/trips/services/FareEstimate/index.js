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
exports.FareEstimate = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const error_message_1 = require("../../../../constants/error_message");
const distances_1 = require("../../../../utils/locations/distances");
const handler_1 = require("../../../../db/handler");
const CitytypeZoneService_1 = require("../../../citytype/services/CitytypeZoneService");
const Tariff_1 = require("../Tariff");
const constants_1 = require("../../../../constants/constants");
const success_message_1 = require("../../../../constants/success_message");
const getStops_1 = require("./getStops");
const getDebrisCisternsCoordinates_1 = require("./getDebrisCisternsCoordinates");
let FareEstimate = class FareEstimate {
    constructor(cityTypeModel, cityModel, promoCodeModel, tariffService, citytypeZoneService) {
        this.cityTypeModel = cityTypeModel;
        this.cityModel = cityModel;
        this.promoCodeModel = promoCodeModel;
        this.tariffService = tariffService;
        this.citytypeZoneService = citytypeZoneService;
        this.handlerQuery = new handler_1.HandlerQuery();
    }
    async getFareEstimate(params, res) {
        if (!params.body?.service_type_id)
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                message: 'Service type id is required',
                error_code: error_message_1.errorMessages.ERROR_CODE_PARAMETER_MISSING,
                error_description: `service_type_id parameter missing`,
            });
        if (typeof params.body.service_type_id !== 'string')
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                error_code: error_message_1.errorMessages.ERROR_CODE_PARAMETER_INVALID,
                error_description: `service_type_id parameter must be a string`,
            });
        const { pickup_latitude, pickup_longitude, destination_latitude, destination_longitude, distance, optimize, number_of_helpers_load, number_of_helpers_download, night_shift, boat_ticket_check = 0, promo_id, } = params.body;
        const originCoordinates = [
            pickup_latitude,
            pickup_longitude,
        ];
        const destinationCoordinates = [
            destination_latitude,
            destination_longitude,
        ];
        const { record: citytype, status } = await this.handlerQuery.findById(this.cityTypeModel, { _id: params.body.service_type_id });
        if (!status)
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                error_code: error_message_1.errorMessages.ERROR_CODE_NO_SERVICE_TYPE_FOUND,
                error_description: `City type not found`,
            });
        const cancellationFees = citytype.cancellation_fee;
        const cityId = citytype.cityid;
        const { record: city, status: cityStatus } = await this.handlerQuery.findById(this.cityModel, { _id: cityId });
        if (!cityStatus)
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                error_code: error_message_1.errorMessages.ERROR_CODE_NO_SERVICE_TYPE_FOUND,
            });
        const unit = city.unit;
        try {
            let distanceKmMile = unit == 1 ? distance * 0.001 : distance * 0.000621371;
            const zoneFareResponse = await this.handleZoneFareCalculation({
                city,
                cityId,
                citytype,
                originCoordinates,
                destinationCoordinates,
                distanceKmMile,
                unit,
                cancellationFees,
            });
            if (zoneFareResponse.status)
                return res.status(common_1.HttpStatus.OK).json(zoneFareResponse);
            let modelPricingType = await this.getModelsPricingType({
                ...params.body,
                citytype,
            });
            if (!modelPricingType)
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    status: false,
                    error_code: error_message_1.errorMessages.ERROR_CODE_NO_SERVICE_TYPE_FOUND,
                });
            const stops = (0, getStops_1.getStops)(params.body);
            const { distance: distanceAux, reorder, legs, } = await distances_1.calculateDistance.getRouteMapInfo({
                origin: originCoordinates,
                destination: destinationCoordinates,
                stops,
                optimize,
            });
            const reorderStops = reorder.map((index) => stops[index]);
            const stopsTypesCount = (0, getStops_1.countStopsTypes)({ legs, optimize });
            distanceKmMile = distanceAux ? distanceAux * 0.001 : 0;
            const freeStops = Number(citytype.free_stops);
            const diffFreeStopsInside = stopsTypesCount.inside - freeStops;
            const outsideStopsPrice = stopsTypesCount.outside * modelPricingType.cost_per_stop_outside_city;
            const totalStopsInside = diffFreeStopsInside > 0 ? diffFreeStopsInside : 0;
            const insideStopsPrice = totalStopsInside * modelPricingType.cost_per_stop_inside_city;
            const helperQuantity = Number(number_of_helpers_load) + Number(number_of_helpers_download);
            const helpersPrice = helperQuantity * modelPricingType.cost_per_helper;
            let pricePerUnitDistance = citytype.price_per_unit_distance;
            const specs = {
                distanceKmMile,
                modelPricingType,
                originCoordinates,
                destinationCoordinates,
                citytype,
                pricePerUnitDistance,
            };
            const dataFees = await this.handleCourierFlowType(params.body, specs);
            const { isFixedFeesUsed, distanceFixed } = dataFees;
            let { priceDistance, isMinFareUsed } = dataFees;
            modelPricingType = dataFees.modelPricingType;
            pricePerUnitDistance = dataFees.pricePerUnitDistance;
            let nightShift = 0;
            let nightShiftCount = night_shift ? Number(night_shift) : 0;
            const margaritaZoneChecked = await this.checkMargaritaZone({
                originCoordinates,
                destinationCoordinates,
                boatTicketCheck: boat_ticket_check,
                modelPricingType,
                nightShiftCount,
            });
            const { isMargarita, boatTicket } = margaritaZoneChecked;
            nightShiftCount = margaritaZoneChecked.nightShiftCount;
            const costTravelInsurance = citytype.cost_travel_insurance || 0;
            priceDistance = Number(priceDistance.toFixed(2));
            nightShift =
                Number(modelPricingType.night_shift ? modelPricingType.night_shift : 0) * nightShiftCount;
            const feeCalculated = await this.calculateFee({
                priceDistance,
                insideStopsPrice,
                outsideStopsPrice,
                nightShift,
                boatTicket,
                citytype,
                modelPricingType,
                isMinFareUsed,
                costTravelInsurance,
                helpersPrice,
            });
            const { total: estimatedFare } = feeCalculated;
            isMinFareUsed = feeCalculated.isMinFareUsed;
            let promoCode = null;
            let promoPayment = 0;
            if (promo_id) {
                promoCode = await this.promoCodeModel
                    .findOne({
                    _id: promo_id,
                })
                    .lean();
            }
            if (promoCode) {
                const promoCodeValue = promoCode.code_value;
                promoPayment =
                    promoCode.code_type == 1
                        ? promoCodeValue
                        : Number((promoCodeValue * 0.01 * estimatedFare).toFixed(2));
            }
            return res.json({
                success: true,
                trip_type: constants_1.constants.TRIP_TYPE_NORMAL,
                distanceFixed,
                user_tax_fee: 0,
                user_miscellaneous_fee: 0,
                message: success_message_1.successMessage.MESSAGE_CODE_YOU_GET_FARE_ESTIMATE,
                distance: distanceKmMile.toFixed(2),
                is_min_fare_used: isMinFareUsed,
                is_fixed_fees_used: isFixedFeesUsed,
                base_price: 0,
                price_per_unit_distance: pricePerUnitDistance,
                price_per_unit_time: 0,
                estimated_fare: estimatedFare,
                unit_set: city.unit,
                cancellation_fees: citytype.cancellation_fee,
                is_margarita: isMargarita,
                boat_ticket_price: boatTicket,
                night_shift_count: nightShiftCount,
                boat_ticket_check,
                helpers_quantity: helperQuantity,
                night_shift_price: modelPricingType.night_shift,
                stops_address: reorderStops,
                promo_payment: promoPayment,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                status: false,
                error_description: error.message,
            });
        }
    }
    async getModelsPricingType({ selected_model_id, selected_service_id, selected_capacity_id, citytype, }) {
        let modelPricingType = null;
        if (selected_model_id || selected_service_id || selected_capacity_id) {
            const modelServiceCondition = {
                _id: { $in: citytype.model_pricing_ids },
            };
            const addCondition = (key, id) => {
                if (id) {
                    modelServiceCondition[`${key}._id`] = new mongoose_2.Types.ObjectId(id);
                }
            };
            addCondition('modelid', selected_model_id);
            addCondition('serviceid', selected_service_id);
            addCondition('capacityid', selected_capacity_id);
            modelPricingType = await this.cityTypeModel
                .findOne(modelServiceCondition)
                .lean();
        }
        return modelPricingType;
    }
    async calculateCityWisePricing(body, { modelPricingType, originCoordinates, destinationCoordinates, citytype }) {
        const { lat, lng } = (0, getDebrisCisternsCoordinates_1.getCoordinatesPickDest)({
            courierFlowType: body.courier_flow_type,
            destinationCoordinates,
            originCoordinates,
        });
        try {
            const cityData = await this.cityModel
                .findOne({
                cityLatLong: {
                    $near: { $near: [Number(lat), Number(lng)], $maxDistance: 1 },
                },
            })
                .lean();
            const newCityType = await this.cityTypeModel
                .findOne({
                typeid: citytype.typeid,
                city_id: cityData._id,
            })
                .lean();
            if (newCityType?.model_pricing_ids?.length) {
                const newModelPricingType = await this.getModelsPricingType(body);
                modelPricingType = newModelPricingType
                    ? newModelPricingType
                    : modelPricingType;
            }
            return modelPricingType;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async handleZoneFareCalculation({ city, cityId, citytype, originCoordinates, destinationCoordinates, distanceKmMile, unit, cancellationFees, }) {
        if (!city.zone_business || !citytype.is_zone)
            return { status: false };
        const { zoneInside: geoOrigin } = await this.citytypeZoneService.checkZones({
            cityId: cityId.toString(),
            currentLocation: originCoordinates,
            modelName: 'cityZoneModel',
        });
        const { zoneInside: geoDestination } = await this.citytypeZoneService.checkZones({
            cityId: cityId.toString(),
            currentLocation: destinationCoordinates,
            modelName: 'cityZoneModel',
        });
        if (!geoOrigin || !geoDestination)
            return { status: false };
        const zoneOriginId = geoOrigin._id;
        const zoneDestinationId = geoDestination._id;
        const { zoneValue } = await this.citytypeZoneService.getValueFromTwoZones({
            serviceTypeId: citytype._id,
            zoneOriginId,
            zoneDestinationId,
        });
        if (!zoneValue)
            return { status: false };
        const estimatedFare = zoneValue.amount.toFixed(2);
        return {
            status: true,
            message: success_message_1.successMessage.MESSAGE_CODE_YOU_GET_FARE_ESTIMATE,
            trip_type: constants_1.constants.TRIP_TYPE_ZONE,
            distance: distanceKmMile.toFixed(2),
            estimated_fare: Number(estimatedFare),
            unit_set: unit,
            cancellation_fees: cancellationFees,
        };
    }
    async handleCourierFlowType(body, specs) {
        const { courier_flow_type } = body;
        return courier_flow_type == constants_1.constants.COURIER_CISTERNA_FLOW ||
            courier_flow_type == constants_1.constants.COURIER_ESCOMBRO_FLOW
            ? await this.fixedFeesFlow(body, specs)
            : await this.handleFeesCalculationFlow(specs);
    }
    async fixedFeesFlow(body, specs) {
        const { originCoordinates, destinationCoordinates, citytype, pricePerUnitDistance, } = specs;
        const modelPricingType = await this.calculateCityWisePricing(body, {
            modelPricingType: specs.modelPricingType,
            originCoordinates,
            destinationCoordinates,
            citytype,
        });
        const priceDistance = modelPricingType.fixed_fees;
        return {
            isFixedFeesUsed: 1,
            modelPricingType,
            priceDistance,
            pricePerUnitDistance,
            distanceFixed: 0,
            isMinFareUsed: 0,
        };
    }
    async handleFeesCalculationFlow(specs) {
        const { distanceKmMile, modelPricingType } = specs;
        const pricesResult = this.tariffService.calculate({
            distanceKmMile,
            modelPricingType,
        });
        let pricePerUnitDistance = pricesResult.pricePerUnitDistance;
        let priceDistance = distanceKmMile * pricePerUnitDistance;
        const recalculatePriceDistance = this.tariffService.recalculate({
            previousTotal: priceDistance,
            modelPricingType,
            distance: distanceKmMile,
        });
        pricePerUnitDistance = recalculatePriceDistance.fixed
            ? recalculatePriceDistance.pricePerUnit
            : pricePerUnitDistance;
        priceDistance = recalculatePriceDistance.fixed
            ? recalculatePriceDistance.price
            : priceDistance;
        return {
            isFixedFeesUsed: 0,
            modelPricingType,
            priceDistance,
            pricePerUnitDistance,
            distanceFixed: recalculatePriceDistance.distanceFixed,
            isMinFareUsed: distanceKmMile < 17 ? 1 : 0,
        };
    }
    async calculateFee({ priceDistance, insideStopsPrice, outsideStopsPrice, nightShift, boatTicket, citytype, modelPricingType, isMinFareUsed, costTravelInsurance, helpersPrice, }) {
        let total = Number(priceDistance) +
            Number(insideStopsPrice) +
            Number(outsideStopsPrice) +
            Number(nightShift) +
            Number(boatTicket);
        const tax = citytype.tax ? citytype.tax : 1;
        total =
            total +
                total * 0.01 * tax +
                Number(costTravelInsurance) +
                Number(helpersPrice);
        if (total < modelPricingType.min_fare || isMinFareUsed) {
            total =
                Number(modelPricingType.min_fare) +
                    Number(helpersPrice) +
                    Number(insideStopsPrice) +
                    Number(outsideStopsPrice) +
                    Number(nightShift) +
                    Number(boatTicket);
            total = total + total * 0.01 * tax + Number(costTravelInsurance);
            isMinFareUsed = 1;
        }
        return {
            total,
            isMinFareUsed,
        };
    }
    async checkMargaritaZone(specs) {
        const { originCoordinates, destinationCoordinates, boatTicketCheck, modelPricingType, } = specs;
        let nightShiftCount = specs.nightShiftCount;
        let isMargarita = false;
        let boatTicket = 0;
        const validateOriginLocation = await this.tariffService.validateLocation(originCoordinates, constants_1.constants.STATES.NUEVA_ESPARTA);
        const validateDestinationLocation = await this.tariffService.validateLocation(destinationCoordinates, constants_1.constants.STATES.NUEVA_ESPARTA);
        if (validateOriginLocation || validateDestinationLocation) {
            nightShiftCount += 1;
            isMargarita = true;
            if (Number(boatTicketCheck) === 1) {
                boatTicket = modelPricingType.boat_ticket
                    ? modelPricingType.boat_ticket
                    : 0;
            }
        }
        return {
            isMargarita,
            nightShiftCount,
            boatTicket,
        };
    }
};
exports.FareEstimate = FareEstimate;
exports.FareEstimate = FareEstimate = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('CityType')),
    __param(1, (0, mongoose_1.InjectModel)('City')),
    __param(2, (0, mongoose_1.InjectModel)('PromoCode')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        Tariff_1.TariffService,
        CitytypeZoneService_1.CitytypeZoneService])
], FareEstimate);
//# sourceMappingURL=index.js.map