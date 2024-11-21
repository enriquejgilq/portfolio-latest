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
exports.OptionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class OptionResponseDto {
}
exports.OptionResponseDto = OptionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado de la respuesta' }),
    __metadata("design:type", Boolean)
], OptionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mensaje descriptivo de la respuesta' }),
    __metadata("design:type", String)
], OptionResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Moneda utilizada' }),
    __metadata("design:type", String)
], OptionResponseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Código de la moneda' }),
    __metadata("design:type", String)
], OptionResponseDto.prototype, "currencycode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Detalles de la ciudad' }),
    __metadata("design:type", Object)
], OptionResponseDto.prototype, "city_detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Métodos de pago disponibles' }),
    __metadata("design:type", Object)
], OptionResponseDto.prototype, "payment_gateway", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipos de ciudad disponibles' }),
    __metadata("design:type", Array)
], OptionResponseDto.prototype, "citytypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipos de pool disponibles' }),
    __metadata("design:type", Array)
], OptionResponseDto.prototype, "pooltypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Hora del servidor en formato ISO' }),
    __metadata("design:type", String)
], OptionResponseDto.prototype, "server_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Si la solicitud es corporativa' }),
    __metadata("design:type", Boolean)
], OptionResponseDto.prototype, "is_corporate_request", void 0);
//# sourceMappingURL=OptionResponse.dto.js.map