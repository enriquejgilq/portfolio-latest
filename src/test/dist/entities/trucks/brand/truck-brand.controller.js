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
exports.TruckBrandController = void 0;
const common_1 = require("@nestjs/common");
const truck_brand_service_1 = require("./truck-brand.service");
const create_truck_brand_dto_1 = require("./create-truck-brand.dto");
const swagger_1 = require("@nestjs/swagger");
let TruckBrandController = class TruckBrandController {
    constructor(truckBrandService) {
        this.truckBrandService = truckBrandService;
    }
    async createTruckBrand(createTruckBrandDto) {
        return this.truckBrandService.create(createTruckBrandDto);
    }
    async getBrandsByTruckType(typeId) {
        const brands = await this.truckBrandService.findBrandsByTruckType(typeId);
        const filteredBrands = brands.map(brand => {
            return {
                _id: brand._id,
                brand: brand.brand,
                country: brand.country,
            };
        });
        return filteredBrands;
    }
};
exports.TruckBrandController = TruckBrandController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_truck_brand_dto_1.CreateTruckBrandDto]),
    __metadata("design:returntype", Promise)
], TruckBrandController.prototype, "createTruckBrand", null);
__decorate([
    (0, common_1.Get)('search/:type_id'),
    (0, swagger_1.ApiOperation)({
        summary: 'You get the brands by the type of truck.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully fetched the list of brands',
        type: create_truck_brand_dto_1.CreateTruckBrandDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Param)('type_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TruckBrandController.prototype, "getBrandsByTruckType", null);
exports.TruckBrandController = TruckBrandController = __decorate([
    (0, common_1.Controller)('truckBrands'),
    __metadata("design:paramtypes", [truck_brand_service_1.TruckBrandService])
], TruckBrandController);
//# sourceMappingURL=truck-brand.controller.js.map