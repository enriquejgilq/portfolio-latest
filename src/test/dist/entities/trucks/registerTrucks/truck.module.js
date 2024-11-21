"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruckModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const truck_service_1 = require("./truck.service");
const truck_controller_1 = require("./truck.controller");
const Truck_schema_1 = require("../../../db/schemas/Truck.schema");
let TruckModule = class TruckModule {
};
exports.TruckModule = TruckModule;
exports.TruckModule = TruckModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: Truck_schema_1.Truck.name, schema: Truck_schema_1.TruckSchema }]),
        ],
        controllers: [truck_controller_1.TruckController],
        providers: [truck_service_1.TruckService],
    })
], TruckModule);
//# sourceMappingURL=truck.module.js.map