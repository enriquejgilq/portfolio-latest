"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitytypeValidationService = void 0;
const common_1 = require("@nestjs/common");
const Provider_schema_1 = require("../../../db/schemas/Provider.schema");
const User_schema_1 = require("../../../db/schemas/User.schema");
const Corporate_schema_1 = require("../../../db/schemas/Corporate.schema");
const validations_1 = require("./validations");
const constants_1 = require("../../../constants/constants");
let CitytypeValidationService = class CitytypeValidationService {
    constructor() {
        this.clientTypeSpecs = {
            provider_id: { model: Provider_schema_1.ProviderModel },
            user_id: { model: User_schema_1.UserModel },
            corporate_id: { model: Corporate_schema_1.CorporateModel },
        };
    }
    async validateClient({ id, token, clientType }) {
        const model = this.clientTypeSpecs[clientType].model;
        try {
            const clientData = await model.findOne({ _id: id }).lean();
            if (!clientData)
                return {
                    status: false,
                    response: {
                        status: common_1.HttpStatus.BAD_REQUEST,
                        message: 'Client not found',
                    },
                };
            if (token !== clientData.token)
                return {
                    status: false,
                    response: {
                        status: common_1.HttpStatus.BAD_REQUEST,
                        message: 'Invalid token',
                    },
                };
            const { userType } = await (0, validations_1.getUserType)({
                constants: constants_1.constants,
                data: clientData,
                model: Corporate_schema_1.CorporateModel,
            });
            return { status: true, data: clientData, userType };
        }
        catch (error) {
            console.error('Error validating client:', error);
            return {
                status: false,
                response: {
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Error validating client',
                },
            };
        }
    }
};
exports.CitytypeValidationService = CitytypeValidationService;
exports.CitytypeValidationService = CitytypeValidationService = __decorate([
    (0, common_1.Injectable)()
], CitytypeValidationService);
//# sourceMappingURL=CitytypeValidationService.js.map