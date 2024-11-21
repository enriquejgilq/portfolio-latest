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
exports.TruckTypeController = void 0;
const common_1 = require("@nestjs/common");
const truck_type_service_1 = require("./truck-type.service");
const create_truck_type_dto_1 = require("./create-truck-type.dto");
let TruckTypeController = class TruckTypeController {
    constructor(truckTypeService) {
        this.truckTypeService = truckTypeService;
    }
    async createTruckType(createTruckTypeDto) {
        return this.truckTypeService.create(createTruckTypeDto);
    }
    async getAllTruckTypes() {
        return this.truckTypeService.findAll();
    }
};
exports.TruckTypeController = TruckTypeController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_truck_type_dto_1.CreateTruckTypeDto]),
    __metadata("design:returntype", Promise)
], TruckTypeController.prototype, "createTruckType", null);
__decorate([
    (0, common_1.Get)('allTypes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TruckTypeController.prototype, "getAllTruckTypes", null);
exports.TruckTypeController = TruckTypeController = __decorate([
    (0, common_1.Controller)('truck-types'),
    __metadata("design:paramtypes", [truck_type_service_1.TruckTypeService])
], TruckTypeController);
//# sourceMappingURL=truck-type.controller.js.map