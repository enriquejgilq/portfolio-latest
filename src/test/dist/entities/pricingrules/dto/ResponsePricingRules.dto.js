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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsePricingRulesDto = exports.PricingRuleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PricingRuleDto {
}
exports.PricingRuleDto = PricingRuleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID único de la regla de precio',
        example: '12345',
    }),
    __metadata("design:type", String)
], PricingRuleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor del porcentaje para la poliza de seguro',
        example: 0.06,
    }),
    __metadata("design:type", Number)
], PricingRuleDto.prototype, "policy_insurance_percentage", void 0);
class ResponsePricingRulesDto {
}
exports.ResponsePricingRulesDto = ResponsePricingRulesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si la operación fue exitosa o no',
        example: true,
    }),
    __metadata("design:type", Boolean)
], ResponsePricingRulesDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mensaje de respuesta en caso de error',
        example: 'Error getting pricing rules',
        required: false,
    }),
    __metadata("design:type", String)
], ResponsePricingRulesDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de reglas de precios obtenidas',
        type: [PricingRuleDto],
        required: false,
    }),
    __metadata("design:type", PricingRuleDto)
], ResponsePricingRulesDto.prototype, "data", void 0);
//# sourceMappingURL=ResponsePricingRules.dto.js.map