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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const s3key_dto_1 = require("./dto/onboarding/natural-user/s3key.dto");
const generic_response_dto_1 = require("./dto/onboarding/natural-user/generic-response.dto");
const upload_image_dto_1 = require("./dto/onboarding/natural-user/upload-image.dto");
const registerNatural_dto_1 = require("./dto/onboarding/natural-user/registerNatural.dto");
const MAX_SIZE_IN_BYTES = 10 * 1024 * 1024;
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async register(createUserDto, profilePicture) {
        return this.usersService.create(createUserDto);
    }
    async naturalRifOcr(naturalRifOcrDto) {
        const { s3Key } = naturalRifOcrDto;
        return this.usersService.naturalRifOcr(s3Key);
    }
    async naturalDniOcr(naturalRifOcrDto) {
        const { s3Key } = naturalRifOcrDto;
        return this.usersService.naturalDniOcr(s3Key);
    }
    async uploadProfilePicture(picture) {
        const pictureUrl = await this.usersService.uploadFileToS3(picture, 'user_profile', '');
        return { pictureUrl };
    }
    async uploadDni(dni) {
        if (!dni) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`;
        const fileName = `${formattedDate}-${dni.originalname}`;
        const dniUrl = await this.usersService.uploadFileToS3(dni, 'user_documents', fileName);
        return { dniUrl };
    }
    async updateMercantileRegistry(userId, file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`;
        const fileName = `${formattedDate}-${file.originalname}`;
        const mercantileRegistryUrl = await this.usersService.uploadFileToS3(file, 'mercantileRegistry', fileName);
        const updatedUser = await this.usersService.updateUserWithMercantileRegistry(userId, mercantileRegistryUrl);
        return updatedUser;
    }
    async uploadRif(rif) {
        if (!rif) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`;
        const fileName = `${formattedDate}-${rif.originalname}`;
        const rifUrl = await this.usersService.uploadFileToS3(rif, 'user_documents', fileName);
        return { rifUrl };
    }
    async registerDocuments(userId, userType, body) {
        const updatedUser = await this.usersService.updateUserWithDocuments(userId, userType, body.pictureUrl, body.dniUrl, body.rifUrl, body.dniRegister, body.rifRegister);
        return updatedUser;
    }
    async getUser(id) {
        return this.usersService.findOne(id);
    }
    async updateUser(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async deleteUser(id) {
        return this.usersService.remove(id);
    }
    async updateUserSettings(userId, updateUserSettingsDto) {
        const { alertSound, driverAlert, language } = updateUserSettingsDto;
        if (!['en', 'es'].includes(language)) {
            throw new common_1.BadRequestException('Invalid language value. Supported languages are "en", "es".');
        }
        return this.usersService.updateUserSettings(userId, updateUserSettingsDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('picture')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('onboarding/ocr/rif'),
    (0, swagger_1.ApiOperation)({ summary: 'Process file uploaded to S3 using OCR' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'RIF OCR successfully processed',
        type: generic_response_dto_1.GResponse,
        schema: {
            example: {
                data: {
                    rifNumberAndNames: 'J-12345678 Juan Pérez',
                    registrationDate: '2022-01-01',
                    dueDate: '2023-01-01',
                    fiscalAddress: 'Calle Ficticia, Caracas, Venezuela',
                },
                statusCode: 200,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request, insufficient information extracted from OCR',
        schema: {
            example: {
                message: 'No se pudo extraer suficiente información del RIF. Por favor, intenta con una imagen más clara.',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'NoSuchKey: The specified key does not exist in the S3 bucket',
        schema: {
            example: {
                message: 'NoSuchKey: The specified key does not exist.',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [s3key_dto_1.NaturalRifOcrDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "naturalRifOcr", null);
__decorate([
    (0, common_1.Post)('onboarding/ocr/dni'),
    (0, swagger_1.ApiOperation)({ summary: 'Process file uploaded to S3 using OCR' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'DNI OCR successfully processed',
        type: generic_response_dto_1.GResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request, insufficient information extracted from OCR',
        schema: {
            example: {
                message: 'Not enough information could be extracted. Please try a clearer image.',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'NoSuchKey: The specified key does not exist in the S3 bucket',
        schema: {
            example: {
                message: 'NoSuchKey: The specified key does not exist.',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [s3key_dto_1.NaturalRifOcrDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "naturalDniOcr", null);
__decorate([
    (0, common_1.Post)('upload-picture'),
    (0, swagger_1.ApiOperation)({ summary: 'upload profile picture to s3' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Profile picture uploaded successfully',
        type: upload_image_dto_1.UploadImageDto,
        schema: {
            example: {
                pictureUrl: 'https://your-bucket-name.s3.amazonaws.com/user_profile/some-image.jpg',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request, invalid file format',
        schema: {
            example: {
                message: 'Invalid file format. Please upload a valid image.',
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('picture')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadProfilePicture", null);
__decorate([
    (0, common_1.Post)('upload-dni'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'upload dni image to s3',
        type: upload_image_dto_1.UploadImageDto,
        schema: {
            example: {
                pictureUrl: 'https://your-bucket-name.s3.amazonaws.com/user_profile/some-image.jpg',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request, invalid file format',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('dni')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({
                fileType: /^(image\/jpeg|image\/png)$/,
            }),
            new common_1.MaxFileSizeValidator({
                maxSize: MAX_SIZE_IN_BYTES,
            }),
        ],
        exceptionFactory: (errors) => {
            const messages = Array.isArray(errors)
                ? errors.map(error => error.message)
                : [errors];
            return new common_1.BadRequestException(messages);
        },
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadDni", null);
__decorate([
    (0, common_1.Post)(':id/mercantileRegistry'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('mercantileRegistry')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({
                fileType: 'application/pdf',
            }),
            new common_1.MaxFileSizeValidator({
                maxSize: MAX_SIZE_IN_BYTES,
            }),
        ],
        exceptionFactory: (errors) => {
            const messages = Array.isArray(errors)
                ? errors.map(error => error.message)
                : [errors];
            return new common_1.BadRequestException(messages);
        },
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateMercantileRegistry", null);
__decorate([
    (0, common_1.Post)('upload-rif'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'upload rif image/pdf to s3',
        type: upload_image_dto_1.UploadImageDto,
        schema: {
            example: {
                pictureUrl: 'https://your-bucket-name.s3.amazonaws.com/user_profile/some-image.jpg',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request, invalid file format',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('rif')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({
                fileType: /^(application\/pdf|image\/jpeg|image\/png)$/,
            }),
            new common_1.MaxFileSizeValidator({
                maxSize: MAX_SIZE_IN_BYTES,
            }),
        ],
        exceptionFactory: (errors) => {
            const messages = Array.isArray(errors)
                ? errors.map(error => error.message)
                : [errors];
            return new common_1.BadRequestException(messages);
        },
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadRif", null);
__decorate([
    (0, common_1.Post)(':id/onboarding/:type'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID of the user to register documents for',
        type: String,
    }),
    (0, swagger_1.ApiParam)({
        name: 'type',
        description: 'User type: false for natural, true for company',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'upload rif image/pdf to s3',
        type: registerNatural_dto_1.UploadDocumentsResponseDto,
        schema: {
            example: {
                pictureUrl: 'https://your-bucket-name.s3.amazonaws.com/user_profile/some-image.jpg',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('type')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registerDocuments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)(':id/settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserSettings", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map