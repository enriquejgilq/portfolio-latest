"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruckTypeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const truck_type_service_1 = require("./truck-type.service");
const truck_type_controller_1 = require("./truck-type.controller");
const TruckType_schema_1 = require("../../../db/schemas/TruckType.schema");
let TruckTypeModule = class TruckTypeModule {
};
exports.TruckTypeModule = TruckTypeModule;
exports.TruckTypeModule = TruckTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: TruckType_schema_1.TruckType.name, schema: TruckType_schema_1.TruckTypeSchema }]),
        ],
        controllers: [truck_type_controller_1.TruckTypeController],
        providers: [truck_type_service_1.TruckTypeService],
    })
], TruckTypeModule);
//# sourceMappingURL=truck-type.module.js.map