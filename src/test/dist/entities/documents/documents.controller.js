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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const documents_service_1 = require("./documents.service");
const swagger_1 = require("@nestjs/swagger");
const document_document_dto_1 = require("./dto/document-document.dto");
let DocumentsController = class DocumentsController {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    async list(res, session) {
        const params = {
            session,
        };
        return this.documentsService.getDocuments(params, res);
    }
    async listPage(req, res, session) {
        const params = {
            body: req.body,
            session,
        };
        return this.documentsService.getDocuments(params, res);
    }
    async generateDocumentExcel(req, res, session) {
        const params = {
            metadata: {
                protocol: req.get('protocol'),
                host: req.get('host'),
            },
            body: req.body,
            session,
        };
        return this.documentsService.generateDocumentExcel(params, res);
    }
    async addDocumentForm(res, session) {
        const params = {
            session,
        };
        return this.documentsService.addDocumentForm(params, res);
    }
    async addDocumentDetails(req, res, session) {
        const params = {
            body: req.body,
            session,
        };
        return this.documentsService.addDocumentDetails(params, res);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'list of documents' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'list of documents',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "listPage", null);
__decorate([
    (0, common_1.Post)('generate_document_excel'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "generateDocumentExcel", null);
__decorate([
    (0, common_1.Get)('add_document_form'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "addDocumentForm", null);
__decorate([
    (0, common_1.Post)('add_document_details'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'created',
        type: document_document_dto_1.DocumentDocumentDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "addDocumentDetails", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map