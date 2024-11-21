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
exports.TruckModelController = void 0;
const common_1 = require("@nestjs/common");
const truck_model_service_1 = require("./truck-model.service");
const create_truck_model_dto_1 = require("./create-truck-model.dto");
let TruckModelController = class TruckModelController {
    constructor(truckModelService) {
        this.truckModelService = truckModelService;
    }
    async createTruckModel(createTruckModelDto) {
        return this.truckModelService.create(createTruckModelDto);
    }
    async getModelsByBrand(brandId) {
        const models = await this.truckModelService.findByBrandId(brandId);
        const filterModel = models.map(models => {
            return {
                _id: models._id,
                brand: models.modelo,
            };
        });
        return filterModel;
    }
};
exports.TruckModelController = TruckModelController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_truck_model_dto_1.CreateTruckModelDto]),
    __metadata("design:returntype", Promise)
], TruckModelController.prototype, "createTruckModel", null);
__decorate([
    (0, common_1.Get)('search/:brandId'),
    __param(0, (0, common_1.Param)('brandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TruckModelController.prototype, "getModelsByBrand", null);
exports.TruckModelController = TruckModelController = __decorate([
    (0, common_1.Controller)('truck-models'),
    __metadata("design:paramtypes", [truck_model_service_1.TruckModelService])
], TruckModelController);
//# sourceMappingURL=truck-model.controller.js.map