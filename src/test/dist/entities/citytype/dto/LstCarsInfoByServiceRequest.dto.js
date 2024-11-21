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
exports.ListCarsInfoByServiceRequestDTO = exports.AllowedCountries = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var AllowedCountries;
(function (AllowedCountries) {
    AllowedCountries["USA"] = "USA";
    AllowedCountries["CAN"] = "CAN";
})(AllowedCountries || (exports.AllowedCountries = AllowedCountries = {}));
class ListCarsInfoByServiceRequestDTO {
}
exports.ListCarsInfoByServiceRequestDTO = ListCarsInfoByServiceRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token de autenticación',
        example: 'your-token-here',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ListCarsInfoByServiceRequestDTO.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'País desde el cual se está realizando la solicitud',
        enum: AllowedCountries,
        example: AllowedCountries.USA,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(AllowedCountries),
    __metadata("design:type", String)
], ListCarsInfoByServiceRequestDTO.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Datos específicos del tipo de cliente',
        required: false,
        example: { someClientTypeField: 'value' },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListCarsInfoByServiceRequestDTO.prototype, "clientTypeData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitud del lugar del usuario',
        required: true,
    }),
    __metadata("design:type", Number)
], ListCarsInfoByServiceRequestDTO.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitud del lugar del usuario',
        required: true,
    }),
    __metadata("design:type", Number)
], ListCarsInfoByServiceRequestDTO.prototype, "longitude", void 0);
//# sourceMappingURL=LstCarsInfoByServiceRequest.dto.js.map