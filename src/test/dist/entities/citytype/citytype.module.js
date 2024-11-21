"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitytypeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const citytype_controller_1 = require("./citytype.controller");
const citytype_service_1 = require("./citytype.service");
const CitytypeValidationService_1 = require("./services/CitytypeValidationService");
const CitytypeLocationService_1 = require("./services/CitytypeLocationService");
const CitytypeZoneService_1 = require("./services/CitytypeZoneService");
const types_1 = require("./services/types");
const models_1 = require("./services/models");
const Country_schema_1 = require("../../db/schemas/Country.schema");
const City_schema_1 = require("../../db/schemas/City.schema");
const RedZoneArea_schema_1 = require("../../db/schemas/RedZoneArea.schema");
const CityZone_schema_1 = require("../../db/schemas/CityZone.schema");
const CityType_schema_1 = require("../../db/schemas/CityType.schema");
const Type_schema_1 = require("../../db/schemas/Type.schema");
const TypeModel_schema_1 = require("../../db/schemas/TypeModel.schema");
const ZoneValue_schema_1 = require("../../db/schemas/ZoneValue.schema");
let CitytypeModule = class CitytypeModule {
};
exports.CitytypeModule = CitytypeModule;
exports.CitytypeModule = CitytypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Country',
                    schema: Country_schema_1.CountrySchema,
                },
                {
                    name: 'City',
                    schema: City_schema_1.CitySchema,
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
                    name: 'CityType',
                    schema: CityType_schema_1.CityTypeSchema,
                },
                {
                    name: 'Type',
                    schema: Type_schema_1.TypeSchema,
                },
                {
                    name: 'TypeModel',
                    schema: TypeModel_schema_1.TypeModelSchema,
                },
                {
                    name: 'ZoneValue',
                    schema: ZoneValue_schema_1.ZoneValueSchema,
                },
            ]),
        ],
        controllers: [citytype_controller_1.CitytypeController],
        providers: [
            citytype_service_1.CitytypeService,
            CitytypeValidationService_1.CitytypeValidationService,
            CitytypeLocationService_1.CitytypeLocationService,
            CitytypeZoneService_1.CitytypeZoneService,
            types_1.TypesService,
            models_1.ModelsService,
        ],
    })
], CitytypeModule);
//# sourceMappingURL=citytype.module.js.map