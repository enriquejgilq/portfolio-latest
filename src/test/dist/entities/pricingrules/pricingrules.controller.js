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
exports.PricingrulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pricingrules_service_1 = require("./pricingrules.service");
const ResponsePricingRules_dto_1 = require("./dto/ResponsePricingRules.dto");
let PricingrulesController = class PricingrulesController {
    constructor(pricingrulesService) {
        this.pricingrulesService = pricingrulesService;
    }
    async getRules(res) {
        return this.pricingrulesService.getRules({}, res);
    }
};
exports.PricingrulesController = PricingrulesController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todas las reglas de precios',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Las reglas de precios se obtuvieron exitosamente',
        type: ResponsePricingRules_dto_1.ResponsePricingRulesDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Hubo un error al obtener las reglas de precios',
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PricingrulesController.prototype, "getRules", null);
exports.PricingrulesController = PricingrulesController = __decorate([
    (0, swagger_1.ApiTags)('Pricing Rules'),
    (0, common_1.Controller)('pricingrules'),
    __metadata("design:paramtypes", [pricingrules_service_1.PricingrulesService])
], PricingrulesController);
//# sourceMappingURL=pricingrules.controller.js.map