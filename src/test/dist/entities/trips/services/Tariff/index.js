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
exports.TariffService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../../constants/constants");
let TariffService = class TariffService {
    constructor(connection) {
        this.connection = connection;
        this.MAX_DISTANCE_FOR_FIXED_PRICE = 300;
    }
    processRanges(pricingRanges, gandolaRanges, { distanceKmMile, modelPricingType }) {
        const selectedRange = (modelPricingType.model_type &&
            modelPricingType.model_type === constants_1.MODEL_TRUCK_TYPE.GANDOLA
            ? gandolaRanges
            : pricingRanges).find((range) => distanceKmMile >= range.min && distanceKmMile <= range.max);
        return selectedRange;
    }
    calculate({ distanceKmMile, modelPricingType }) {
        const pricingRanges = [
            { min: 0, max: 15, priceKey: 'price_per_km_a', range: 0 },
            { min: 16, max: 30, priceKey: 'price_per_km_b', range: 1 },
            { min: 31, max: 49, priceKey: 'price_per_km_c', range: 2 },
            { min: 50, max: 65, priceKey: 'price_per_km_d', range: 3 },
            { min: 66, max: 90, priceKey: 'price_per_km_e', range: 4 },
            { min: 91, max: 120, priceKey: 'price_per_km_f', range: 5 },
            { min: 121, max: 139, priceKey: 'price_per_km_g', range: 6 },
            { min: 140, max: 160, priceKey: 'price_per_km_h', range: 7 },
            { min: 161, max: 180, priceKey: 'price_per_km_i', range: 8 },
            { min: 181, max: 200, priceKey: 'price_per_km_j', range: 9 },
            { min: 201, max: 220, priceKey: 'price_per_km_k', range: 10 },
            { min: 221, max: 240, priceKey: 'price_per_km_m', range: 11 },
            { min: 241, max: 260, priceKey: 'price_per_km_n', range: 12 },
            { min: 261, max: 280, priceKey: 'price_per_km_l', range: 13 },
            { min: 281, max: 300, priceKey: 'price_per_km_o', range: 14 },
            { min: 301, max: Infinity, priceKey: 'price_per_km_r', range: 15 },
        ];
        const gandolaRanges = [
            { min: 301, max: 400, priceKey: 'price_per_km_p', range: 19 },
            { min: 401, max: 500, priceKey: 'price_per_km_q', range: 20 },
            { min: 501, max: 600, priceKey: 'price_per_km_r', range: 21 },
            { min: 601, max: 700, priceKey: 'price_per_km_s', range: 22 },
            { min: 701, max: 800, priceKey: 'price_per_km_t', range: 23 },
            { min: 801, max: 900, priceKey: 'price_per_km_u', range: 24 },
            { min: 901, max: 1000, priceKey: 'price_per_km_v', range: 25 },
            { min: 1001, max: 1300, priceKey: 'price_per_km_w', range: 26 },
            { min: 1301, max: Infinity, priceKey: 'price_per_km_y', range: 27 },
        ];
        const selectedRange = this.processRanges(pricingRanges, gandolaRanges, {
            distanceKmMile,
            modelPricingType,
        });
        const pricePerUnitDistance = selectedRange
            ? modelPricingType[selectedRange.priceKey]
            : 0;
        const range = selectedRange ? selectedRange.range : 0;
        return { pricePerUnitDistance, range };
    }
    recalculate({ previousTotal, modelPricingType, distance }) {
        const { pricePerUnitDistance, distanceKmMile, fixedRange } = this.recalculateRange({
            distance,
            modelPricingType,
        });
        const newPrice = pricePerUnitDistance * distanceKmMile;
        const isFixedPrice = (newPrice > previousTotal &&
            distance < this.MAX_DISTANCE_FOR_FIXED_PRICE) ||
            fixedRange;
        return {
            pricePerUnit: pricePerUnitDistance,
            price: isFixedPrice ? newPrice : 0,
            fixed: isFixedPrice,
            distanceFixed: isFixedPrice ? distanceKmMile : 0,
        };
    }
    recalculateRange({ distance, modelPricingType }) {
        const ranges = [
            { min: 15, max: 27, priceKey: 'price_per_km_b', baseDistance: 0 },
            { min: 30, max: 42, priceKey: 'price_per_km_b', baseDistance: 30 },
            { min: 50, max: 62, priceKey: 'price_per_km_c', baseDistance: 49 },
            { min: 65, max: 77, priceKey: 'price_per_km_d', baseDistance: 65 },
            { min: 90, max: 105, priceKey: 'price_per_km_e', baseDistance: 90 },
            { min: 120, max: 132, priceKey: 'price_per_km_f', baseDistance: 120 },
            { min: 140, max: 152, priceKey: 'price_per_km_g', baseDistance: 139 },
            { min: 160, max: 172, priceKey: 'price_per_km_h', baseDistance: 160 },
            { min: 181, max: 192, priceKey: 'price_per_km_i', baseDistance: 180 },
            { min: 200, max: 213, priceKey: 'price_per_km_j', baseDistance: 200 },
            { min: 220, max: 233, priceKey: 'price_per_km_k', baseDistance: 220 },
            { min: 240, max: 253, priceKey: 'price_per_km_m', baseDistance: 240 },
            { min: 260, max: 273, priceKey: 'price_per_km_n', baseDistance: 260 },
            { min: 280, max: 293, priceKey: 'price_per_km_l', baseDistance: 280 },
            { min: 300, max: 320, priceKey: 'price_per_km_o', baseDistance: 300 },
        ];
        const gandolaRanges = [
            {
                min: 300,
                max: 313,
                priceKey: 'price_per_km_o',
                baseDistance: 300,
                fixedRange: true,
            },
            {
                min: 400,
                max: 413,
                priceKey: 'price_per_km_p',
                baseDistance: 400,
                fixedRange: true,
            },
            {
                min: 500,
                max: 513,
                priceKey: 'price_per_km_q',
                baseDistance: 500,
                fixedRange: true,
            },
            {
                min: 600,
                max: 613,
                priceKey: 'price_per_km_r',
                baseDistance: 600,
                fixedRange: true,
            },
            {
                min: 700,
                max: 713,
                priceKey: 'price_per_km_s',
                baseDistance: 700,
                fixedRange: true,
            },
            {
                min: 800,
                max: 813,
                priceKey: 'price_per_km_t',
                baseDistance: 800,
                fixedRange: true,
            },
            {
                min: 900,
                max: 913,
                priceKey: 'price_per_km_u',
                baseDistance: 900,
                fixedRange: true,
            },
            {
                min: 1000,
                max: 1020,
                priceKey: 'price_per_km_v',
                baseDistance: 1000,
                fixedRange: true,
            },
            {
                min: 1300,
                max: 1313,
                priceKey: 'price_per_km_w',
                baseDistance: 1300,
                fixedRange: true,
            },
        ];
        const selectedRange = this.processRanges(ranges, gandolaRanges, {
            distanceKmMile: distance,
            modelPricingType,
        });
        const pricePerUnitDistance = selectedRange
            ? modelPricingType[selectedRange.priceKey]
            : 0;
        return {
            pricePerUnitDistance,
            distanceKmMile: selectedRange?.baseDistance ?? distance,
            fixedRange: selectedRange?.fixedRange ? true : false,
        };
    }
    async validateLocation(coordinates, stateNumber) {
        const [latitude, longitude] = coordinates;
        const query = {
            state_number: stateNumber,
            'features.geometry': {
                $geoIntersects: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                },
            },
        };
        const collection = this.connection.db.collection('states_by_country');
        const coordinatesFound = await collection.find(query).toArray();
        return coordinatesFound.length > 0;
    }
};
exports.TariffService = TariffService;
exports.TariffService = TariffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection])
], TariffService);
//# sourceMappingURL=index.js.map