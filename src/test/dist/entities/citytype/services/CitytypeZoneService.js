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
exports.CitytypeZoneService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const geolocation_1 = require("../../../utils/locations/geolocation");
let CitytypeZoneService = class CitytypeZoneService {
    constructor(redZoneAreaModel, cityZoneModel, zoneValueModel) {
        this.redZoneAreaModel = redZoneAreaModel;
        this.cityZoneModel = cityZoneModel;
        this.zoneValueModel = zoneValueModel;
    }
    async checkZones({ cityId, currentLocation, modelName }) {
        const { isInside: zoneInside, status } = await this.checkZone({
            model: this[modelName],
            cityId,
            currentLocation,
        });
        return status ? { zoneInside } : { zoneInside: null };
    }
    async checkZone({ model, cityId, currentLocation }) {
        try {
            const zonesData = await model.find({ cityid: cityId }).lean();
            const isInside = geolocation_1.geolocation.findZoneByPoint(zonesData, {
                latitude: currentLocation[0],
                longitude: currentLocation[1],
            });
            return { isInside, status: true };
        }
        catch (error) {
            console.error('Error checking zone', error);
            return { status: false };
        }
    }
    async getValueFromTwoZones({ serviceTypeId, zoneOriginId, zoneDestinationId, }) {
        try {
            const zoneValue = await this.zoneValueModel
                .findOne({
                service_type_id: serviceTypeId,
                $or: [
                    {
                        from: zoneOriginId,
                        to: zoneDestinationId,
                    },
                    {
                        from: zoneDestinationId,
                        to: zoneOriginId,
                    },
                ],
            })
                .select({ amount: 1 })
                .lean();
            return { zoneValue };
        }
        catch (error) {
            console.error('Error getting value from two zones', error);
            return { zoneValue: null };
        }
    }
};
exports.CitytypeZoneService = CitytypeZoneService;
exports.CitytypeZoneService = CitytypeZoneService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('RedZoneArea')),
    __param(1, (0, mongoose_1.InjectModel)('CityZone')),
    __param(2, (0, mongoose_1.InjectModel)('ZoneValue')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CitytypeZoneService);
//# sourceMappingURL=CitytypeZoneService.js.map