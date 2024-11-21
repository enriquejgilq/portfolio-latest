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
exports.FareEstimateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FareEstimateDto {
}
exports.FareEstimateDto = FareEstimateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del tipo de servicio, debe ser un string',
        example: 'service-type-123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FareEstimateDto.prototype, "service_type_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitud de la ubicación de recogida',
        example: 40.7128,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FareEstimateDto.prototype, "pickup_latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitud de la ubicación de recogida',
        example: -74.0060,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FareEstimateDto.prototype, "pickup_longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitud de la ubicación de destino',
        example: 40.73061,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FareEstimateDto.prototype, "destination_latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitud de la ubicación de destino',
        example: -73.935242,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FareEstimateDto.prototype, "destination_longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Distancia entre la ubicación de recogida y destino en metros',
        example: 1000,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FareEstimateDto.prototype, "distance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicador de si se debe optimizar la ruta',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FareEstimateDto.prototype, "optimize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de ayudantes para carga',
        example: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FareEstimateDto.prototype, "number_of_helpers_load", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de ayudantes para descarga',
        example: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FareEstimateDto.prototype, "number_of_helpers_download", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de turno nocturno',
        example: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FareEstimateDto.prototype, "night_shift", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicador de si se debe verificar el ticket de barco',
        example: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FareEstimateDto.prototype, "boat_ticket_check", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del código promocional',
        example: 'promo123',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FareEstimateDto.prototype, "promo_id", void 0);
//# sourceMappingURL=getFareEstimate.dto.js.map