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
exports.TruckBrandService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const TruckBrand_schema_1 = require("../../../db/schemas/TruckBrand.schema");
let TruckBrandService = class TruckBrandService {
    constructor(truckBrandModel) {
        this.truckBrandModel = truckBrandModel;
    }
    async create(createTruckBrandDto) {
        const newTruckBrand = new this.truckBrandModel(createTruckBrandDto);
        return newTruckBrand.save();
    }
    async findBrandsByTruckType(typeId) {
        const brands = await this.truckBrandModel.find({
            truck_type_ids: typeId
        }).exec();
        return brands;
    }
};
exports.TruckBrandService = TruckBrandService;
exports.TruckBrandService = TruckBrandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(TruckBrand_schema_1.TruckBrand.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TruckBrandService);
//# sourceMappingURL=truck-brand.service.js.map