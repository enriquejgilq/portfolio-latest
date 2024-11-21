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
exports.ListModelsCarsResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ListModelsCarsResponseDto {
}
exports.ListModelsCarsResponseDto = ListModelsCarsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del modelo',
        example: '60d21b4667d0d8992e610c85',
    }),
    __metadata("design:type", String)
], ListModelsCarsResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del modelo',
        example: 'Modelo X',
    }),
    __metadata("design:type", String)
], ListModelsCarsResponseDto.prototype, "model_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL de la imagen del modelo',
        example: 'https://example.com/image.jpg',
    }),
    __metadata("design:type", String)
], ListModelsCarsResponseDto.prototype, "model_image_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de tipos de servicios',
        type: [String],
        example: ['servicio1', 'servicio2'],
    }),
    __metadata("design:type", Array)
], ListModelsCarsResponseDto.prototype, "type_service_list", void 0);
//# sourceMappingURL=ListModelsCarsResponse.dto.js.map