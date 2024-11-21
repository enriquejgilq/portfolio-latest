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
exports.ModelsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const error_message_1 = require("../../../../constants/error_message");
let ModelsService = class ModelsService {
    constructor(typeModelModel) {
        this.typeModelModel = typeModelModel;
    }
    async getModelsCars(params, res) {
        if (!params.body.modelsTypesIds || !params.body.modelsTypesIds.length)
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                message: 'No models types',
            });
        const { modelsTypesIds } = params.body;
        const ids = modelsTypesIds.map((id) => new mongoose_2.Types.ObjectId(id));
        try {
            const modelsTypes = await this.typeModelModel
                .find({
                _id: { $in: ids },
            })
                .select({
                _id: 1,
                model_name: 1,
                model_image_url: 1,
                type_service_list: 1,
            })
                .lean();
            return res.status(common_1.HttpStatus.OK).json({
                status: true,
                data: modelsTypes,
            });
        }
        catch (error) {
            console.error('🚀 ~ file: index.ts ~ line 85 ~ TypesService ~ getCarsTypesByTypeIds ~ error', error);
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: false,
                message: 'No models types found',
                error_code: error_message_1.errorMessages.ERROR_CODE_MODEL_NOT_AVAILABLE,
            });
        }
    }
};
exports.ModelsService = ModelsService;
exports.ModelsService = ModelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('TypeModel')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ModelsService);
//# sourceMappingURL=index.js.map