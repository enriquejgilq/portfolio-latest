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
exports.TripsController = void 0;
const common_1 = require("@nestjs/common");
const getFareEstimate_dto_1 = require("./dto/getFareEstimate.dto");
const FareEstimate_1 = require("./services/FareEstimate");
const swagger_1 = require("@nestjs/swagger");
let TripsController = class TripsController {
    constructor(fareEstimateService) {
        this.fareEstimateService = fareEstimateService;
    }
    async getFareEstimate(req, res, session) {
        const params = {
            session,
            body: req.body,
        };
        return this.fareEstimateService.getFareEstimate(params, res);
    }
};
exports.TripsController = TripsController;
__decorate([
    (0, common_1.Post)('get-fare-estimate'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'created',
        type: getFareEstimate_dto_1.FareEstimateDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TripsController.prototype, "getFareEstimate", null);
exports.TripsController = TripsController = __decorate([
    (0, common_1.Controller)('trips'),
    __metadata("design:paramtypes", [FareEstimate_1.FareEstimate])
], TripsController);
//# sourceMappingURL=trips.controller.js.map