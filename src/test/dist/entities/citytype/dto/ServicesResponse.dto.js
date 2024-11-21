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
exports.ServicesResponseDTO = exports.ServiceDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ServiceDTO {
}
exports.ServiceDTO = ServiceDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID único del servicio',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceDTO.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del servicio',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceDTO.prototype, "service_name", void 0);
class ServicesResponseDTO {
}
exports.ServicesResponseDTO = ServicesResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado de la respuesta',
        default: true,
    }),
    __metadata("design:type", Boolean)
], ServicesResponseDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de servicios',
        type: [ServiceDTO],
    }),
    __metadata("design:type", Array)
], ServicesResponseDTO.prototype, "data", void 0);
//# sourceMappingURL=ServicesResponse.dto.js.map