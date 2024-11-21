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
exports.CitytypeLocationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const distances_1 = require("../../../utils/locations/distances");
const constants_1 = require("../../../constants/constants");
const geolocation_1 = require("../../../utils/locations/geolocation");
const error_message_1 = require("../../../constants/error_message");
let CitytypeLocationService = class CitytypeLocationService {
    constructor(countryModel, cityModel) {
        this.countryModel = countryModel;
        this.cityModel = cityModel;
    }
    async getLocationData({ country, currentLocation, countryCode, }) {
        const countryData = await this.countryModel
            .findOne({
            $or: [
                { countryname: country },
                { alpha2: { $exists: true, $eq: countryCode } },
            ],
        })
            .lean();
        const citiesResponse = await this.getNearByCities({
            countryData,
            currentLocation,
        });
        if (!citiesResponse.status) {
            return {
                status: false,
                response: {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'No city found',
                    error_code: error_message_1.errorMessages.ERROR_CODE_OUR_BUSINESS_NOT_IN_YOUR_COUNTRY,
                },
            };
        }
        const size = citiesResponse.data.length;
        if (!size)
            return {
                status: false,
                response: {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'No city found',
                    error_code: error_message_1.errorMessages.ERROR_CODE_OUR_BUSINESS_NOT_IN_YOUR_COUNTRY,
                },
            };
        const nearbyCityDetails = this.findNearestCity({
            citiesData: citiesResponse.data,
            currentLocation,
        });
        return {
            status: true,
            nearbyCityDetails,
        };
    }
    async getNearByCities(specs) {
        try {
            const { countryData, currentLocation } = specs;
            const specsCityFilter = !countryData
                ? {
                    cityLatLong: {
                        $near: currentLocation,
                        $maxDistance: 1,
                    },
                    isBusiness: constants_1.constants.YES,
                }
                : {
                    countryid: countryData._id,
                    isBusiness: constants_1.constants.YES,
                };
            const citiesData = await this.cityModel.find(specsCityFilter).lean();
            return { status: true, data: citiesData };
        }
        catch (error) {
            console.error('Error in getNearByCities', error);
            return {
                status: false,
            };
        }
    }
    findNearestCity({ citiesData, currentLocation }) {
        let finalDistance = Infinity;
        const nearbyCityDetails = citiesData.reduce((acc, city) => {
            const distance = distances_1.calculateDistance.haversineDistance({
                fromLocation: currentLocation,
                toLocation: city.cityLatLong,
            });
            if (!city.is_use_city_boundary) {
                const isInside = geolocation_1.geolocation.isPointInsidePolygon({
                    latitude: currentLocation[0],
                    longitude: currentLocation[1],
                }, city.city_locations);
                if (isInside && distance < finalDistance) {
                    acc.finalCityId = city._id;
                    acc.finalCityDetails = city;
                    finalDistance = distance;
                }
            }
            if (distance < city.cityRadius && distance < finalDistance) {
                acc.finalCityId = city._id;
                acc.finalCityDetails = city;
                finalDistance = distance;
            }
            return acc;
        }, { finalCityId: null, finalCityDetails: {} });
        return nearbyCityDetails;
    }
};
exports.CitytypeLocationService = CitytypeLocationService;
exports.CitytypeLocationService = CitytypeLocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Country')),
    __param(1, (0, mongoose_1.InjectModel)('City')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CitytypeLocationService);
//# sourceMappingURL=CitytypeLocationService.js.map