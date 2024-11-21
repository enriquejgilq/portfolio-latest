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
exports.CitytypeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const citytype_service_1 = require("./citytype.service");
const models_1 = require("./services/models");
const OptionsRequest_dto_1 = require("./dto/OptionsRequest.dto");
const ServicesResponse_dto_1 = require("./dto/ServicesResponse.dto");
const LstCarsInfoByServiceRequest_dto_1 = require("./dto/LstCarsInfoByServiceRequest.dto");
const ListCarsInfoByServiceResponse_dto_1 = require("./dto/ListCarsInfoByServiceResponse.dto");
const error_message_1 = require("../../constants/error_message");
const ListModelsCarsResponse_dto_1 = require("./dto/ListModelsCarsResponse.dto");
const ListModelsCarsRequest_dto_1 = require("./dto/ListModelsCarsRequest.dto");
let CitytypeController = class CitytypeController {
    constructor(citytypeService, modelsService) {
        this.citytypeService = citytypeService;
        this.modelsService = modelsService;
        this.allowedCountries = ['Venezuela'];
        this.clientType = ['user_id', 'provider_id', 'corporate_id'];
    }
    async listServicesOptions(req, res, body, session) {
        if (!body?.token)
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                status: false,
                message: 'Token not found',
                error_code: 'ERROR_CODE_INVALID_TOKEN',
            });
        if (!body?.country || !this.allowedCountries.includes(body.country))
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                message: 'Country not allowed',
            });
        const clientType = this.clientType.find((element) => {
            return element in body;
        });
        const params = {
            session,
            body,
            clientType,
        };
        try {
            const result = await this.citytypeService.getCitytypeOptions(params, res);
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                message: 'Error in processing the request',
            });
        }
    }
    async listServicesByType(res, session) {
        const params = { session };
        return this.citytypeService.getServicesbyType(params, res);
    }
    async listCarsInfoByservice(body, res, session) {
        if (!body.country || !this.allowedCountries.includes(body.country))
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                message: 'Country not allowed',
            });
        const clientType = this.clientType.find((element) => {
            return element in body;
        });
        const params = {
            session,
            body,
            clientType,
        };
        return this.citytypeService.getCarsInfoByService(params, res);
    }
    async listModelsCars(body, res, session) {
        if (!body.token) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                status: false,
                message: 'Token not found',
                error_code: error_message_1.errorMessages.ERROR_CODE_INVALID_TOKEN,
            });
        }
        const params = { session, body };
        return this.modelsService.getModelsCars(params, res);
    }
};
exports.CitytypeController = CitytypeController;
__decorate([
    (0, common_1.Post)('options'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, OptionsRequest_dto_1.OptionRequestDto, Object]),
    __metadata("design:returntype", Promise)
], CitytypeController.prototype, "listServicesOptions", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de servicios por tipo',
        type: ServicesResponse_dto_1.ServicesResponseDTO,
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CitytypeController.prototype, "listServicesByType", null);
__decorate([
    (0, common_1.Post)('cars-types'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene información de los tipos de autos según el servicio',
    }),
    (0, swagger_1.ApiBody)({ type: LstCarsInfoByServiceRequest_dto_1.ListCarsInfoByServiceRequestDTO }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Información de autos por servicio obtenida correctamente',
        type: ListCarsInfoByServiceResponse_dto_1.ListCarsInfoByServiceResponseDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Token no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'País no permitido',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LstCarsInfoByServiceRequest_dto_1.ListCarsInfoByServiceRequestDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], CitytypeController.prototype, "listCarsInfoByservice", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener lista de modelos de coches' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Lista de modelos de coches',
        type: [ListModelsCarsResponse_dto_1.ListModelsCarsResponseDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Token no encontrado o inválido',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Faltan parámetros o IDs de tipos de modelos inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ListModelsCarsRequest_dto_1.ListModelsCarsRequestDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CitytypeController.prototype, "listModelsCars", null);
exports.CitytypeController = CitytypeController = __decorate([
    (0, swagger_1.ApiTags)('citytype'),
    (0, common_1.Controller)('citytype'),
    __metadata("design:paramtypes", [citytype_service_1.CitytypeService,
        models_1.ModelsService])
], CitytypeController);
//# sourceMappingURL=citytype.controller.js.map