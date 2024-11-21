"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const trips_controller_1 = require("./trips.controller");
const CityType_schema_1 = require("../../db/schemas/CityType.schema");
const City_schema_1 = require("../../db/schemas/City.schema");
const PromoCode_schema_1 = require("../../db/schemas/PromoCode.schema");
const RedZoneArea_schema_1 = require("../../db/schemas/RedZoneArea.schema");
const CityZone_schema_1 = require("../../db/schemas/CityZone.schema");
const ZoneValue_schema_1 = require("../../db/schemas/ZoneValue.schema");
const trips_service_1 = require("./trips.service");
const FareEstimate_1 = require("./services/FareEstimate");
const Tariff_1 = require("./services/Tariff");
const CitytypeZoneService_1 = require("../citytype/services/CitytypeZoneService");
let TripsModule = class TripsModule {
};
exports.TripsModule = TripsModule;
exports.TripsModule = TripsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'CityType',
                    schema: CityType_schema_1.CityTypeSchema,
                },
                {
                    name: 'City',
                    schema: City_schema_1.CitySchema,
                },
                {
                    name: 'PromoCode',
                    schema: PromoCode_schema_1.PromoCodeSchema,
                },
                {
                    name: 'RedZoneArea',
                    schema: RedZoneArea_schema_1.RedZoneAreaSchema,
                },
                {
                    name: 'CityZone',
                    schema: CityZone_schema_1.CityZoneSchema,
                },
                {
                    name: 'ZoneValue',
                    schema: ZoneValue_schema_1.ZoneValueSchema,
                },
            ]),
        ],
        controllers: [trips_controller_1.TripsController],
        providers: [trips_service_1.TripsService, FareEstimate_1.FareEstimate, Tariff_1.TariffService, CitytypeZoneService_1.CitytypeZoneService],
    })
], TripsModule);
//# sourceMappingURL=trips.module.js.map