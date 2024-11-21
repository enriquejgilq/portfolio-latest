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
exports.DocumentDocumentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
class DocumentDocumentDto {
}
exports.DocumentDocumentDto = DocumentDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the document',
        type: Number,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DocumentDocumentDto.prototype, "unique_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the document',
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocumentDocumentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country ID related to the document',
        type: String,
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], DocumentDocumentDto.prototype, "countryid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of the document',
        type: Number,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DocumentDocumentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Option of the document',
        type: Number,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DocumentDocumentDto.prototype, "option", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if the document has a unique code',
        type: Boolean,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DocumentDocumentDto.prototype, "is_unique_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if the document has an expiration date',
        type: Boolean,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DocumentDocumentDto.prototype, "is_expired_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if the document is a degree',
        type: Boolean,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DocumentDocumentDto.prototype, "is_degree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if the document has an issue date',
        type: Boolean,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DocumentDocumentDto.prototype, "is_issue_date", void 0);
//# sourceMappingURL=document-document.dto.js.map