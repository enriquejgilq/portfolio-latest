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
exports.UploadDocumentsResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DniRegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Names on the DNI' }),
    __metadata("design:type", String)
], DniRegisterDto.prototype, "names", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'DNI Expedition date' }),
    __metadata("design:type", String)
], DniRegisterDto.prototype, "expedition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'DNI Expiration date' }),
    __metadata("design:type", String)
], DniRegisterDto.prototype, "expiration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Surnames on the DNI' }),
    __metadata("design:type", String)
], DniRegisterDto.prototype, "surnames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'DNI number' }),
    __metadata("design:type", String)
], DniRegisterDto.prototype, "dniNumber", void 0);
class RifRegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'RIF number and names' }),
    __metadata("design:type", String)
], RifRegisterDto.prototype, "rifNumberAndNames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'RIF registration date' }),
    __metadata("design:type", String)
], RifRegisterDto.prototype, "registrationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'RIF due date' }),
    __metadata("design:type", String)
], RifRegisterDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'RIF fiscal address' }),
    __metadata("design:type", String)
], RifRegisterDto.prototype, "fiscalAddress", void 0);
class UploadDocumentsResponseDto {
}
exports.UploadDocumentsResponseDto = UploadDocumentsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL of the uploaded profile picture' }),
    __metadata("design:type", String)
], UploadDocumentsResponseDto.prototype, "pictureUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL of the uploaded DNI image' }),
    __metadata("design:type", String)
], UploadDocumentsResponseDto.prototype, "dniUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL of the uploaded RIF image' }),
    __metadata("design:type", String)
], UploadDocumentsResponseDto.prototype, "rifUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'DNI registration details' }),
    __metadata("design:type", DniRegisterDto)
], UploadDocumentsResponseDto.prototype, "dniRegister", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'RIF registration details' }),
    __metadata("design:type", RifRegisterDto)
], UploadDocumentsResponseDto.prototype, "rifRegister", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'false: Natural, true: Empresa' }),
    __metadata("design:type", Boolean)
], UploadDocumentsResponseDto.prototype, "type", void 0);
//# sourceMappingURL=registerNatural.dto.js.map