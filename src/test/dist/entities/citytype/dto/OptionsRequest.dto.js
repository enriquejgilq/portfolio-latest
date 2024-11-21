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
exports.OptionRequestDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class OptionRequestDto {
}
exports.OptionRequestDto = OptionRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'El token de autenticación del cliente' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OptionRequestDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'El país del cliente', example: 'US' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OptionRequestDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'El código de país opcional', example: 'US' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OptionRequestDto.prototype, "country_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitud de la ubicación del cliente' }),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], OptionRequestDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitud de la ubicación del cliente' }),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], OptionRequestDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de cliente que puede ser uno de los valores: clientTypeA, clientTypeB',
        enum: ['clientTypeA', 'clientTypeB'],
    }),
    (0, class_validator_1.IsEnum)(['clientTypeA', 'clientTypeB']),
    __metadata("design:type", String)
], OptionRequestDto.prototype, "clientType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Un array de los servicios disponibles para el cliente',
        type: [String],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], OptionRequestDto.prototype, "services", void 0);
//# sourceMappingURL=OptionsRequest.dto.js.map