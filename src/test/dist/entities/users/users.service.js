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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const UserP_schema_1 = require("../../db/schemas/UserP.schema");
const mongoose_2 = require("mongoose");
const ocr_service_1 = require("../../services/ocr/ocr.service");
const AWS = require("aws-sdk");
const generic_response_model_1 = require("../../models/generic-response.model");
const dni_ocr_1 = require("./dto/onboarding/ocr/dni-ocr");
const generic_exception_1 = require("../../exceptions/generic-exception");
const rif_ocr_1 = require("./dto/onboarding/ocr/rif-ocr");
let UsersService = class UsersService {
    constructor(userModel, ocrService) {
        this.userModel = userModel;
        this.ocrService = ocrService;
    }
    async create(createUserDto) {
        try {
            if (createUserDto.unique_id) {
                const existingUser = await this.userModel.findOne({ unique_id: createUserDto.unique_id });
                if (existingUser) {
                    throw new common_1.ConflictException(`User with unique_id ${createUserDto.unique_id} already exists`);
                }
            }
            if (!createUserDto.unique_id) {
                const lastUser = await this.userModel.findOne().sort({ unique_id: -1 }).exec();
                createUserDto.unique_id = lastUser ? lastUser.unique_id + 1 : 1;
            }
            const createdUser = new this.userModel(createUserDto);
            return await createdUser.save();
        }
        catch (error) {
            if (error.code === 11000) {
                const duplicateKey = Object.keys(error.keyValue)[0];
                const duplicateValue = error.keyValue[duplicateKey];
                throw new common_1.ConflictException(`Duplicate key error: ${duplicateKey} with value '${duplicateValue}' already exists.`);
            }
            throw error;
        }
    }
    async naturalRifOcr(s3Key) {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY_ID,
            region: process.env.AWS_REGION,
        });
        const s3 = new AWS.S3();
        const key = decodeURIComponent(s3Key.split('.amazonaws.com/')[1]);
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET_USERS,
                Key: key,
            };
            const data = await s3.getObject(params).promise();
            const rifBuffer = data.Body;
            const response = await this.ocrService.OcrImage(rifBuffer, true);
            if (!Array.isArray(response)) {
                throw new Error("OCR response is not an array");
            }
            let lines = response;
            if (lines.length < 12) {
                return new generic_response_model_1.GenericResponse({ message: 'No se pudo extraer suficiente información del RIF. Por favor, intenta con una imagen más clara.' }, common_1.HttpStatus.BAD_REQUEST);
            }
            let rifOcr = new rif_ocr_1.RifOcr();
            const rifLine = lines.find(line => line.match(/^[JVEG][0-9]+/));
            rifOcr.rifNumberAndNames = rifLine ? rifLine.trim() : '';
            const registrationDateIndex = lines.indexOf('FECHA DE INSCRIPCIÓN:');
            rifOcr.registrationDate = registrationDateIndex !== -1 ? lines[registrationDateIndex + 1]?.trim() || '' : '';
            const expirationDateIndex = lines.indexOf('FECHA DE VENCIMIENTO:');
            rifOcr.dueDate = expirationDateIndex !== -1 ? lines[expirationDateIndex + 1]?.trim() || '' : '';
            const addressIndex = lines.findIndex(line => line.includes('DOMICILIO FISCAL'));
            if (addressIndex !== -1) {
                let fiscalAddressLines = [];
                for (let i = addressIndex; i < expirationDateIndex; i++) {
                    const line = lines[i].trim();
                    if (line.length > 0) {
                        fiscalAddressLines.push(line);
                    }
                }
                rifOcr.fiscalAddress = fiscalAddressLines.join(' ').trim();
            }
            if (!rifOcr.rifNumberAndNames || !rifOcr.fiscalAddress) {
                return new generic_response_model_1.GenericResponse({ message: 'Por favor, tome una foto más clara del documento.' }, common_1.HttpStatus.BAD_REQUEST);
            }
            return new generic_response_model_1.GenericResponse(rifOcr, common_1.HttpStatus.OK);
        }
        catch (error) {
            if (error.code === 'NoSuchKey') {
                return new generic_response_model_1.GenericResponse({ message: 'NoSuchKey: The specified key does not exist.' }, common_1.HttpStatus.NOT_FOUND);
            }
            throw new generic_exception_1.GenericException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async naturalDniOcr(s3Key) {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY_ID,
            region: process.env.AWS_REGION,
        });
        const s3 = new AWS.S3();
        const key = decodeURIComponent(s3Key.split('.amazonaws.com/')[1]);
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET_USERS,
                Key: key,
            };
            console.log(params);
            const data = await s3.getObject(params).promise();
            const dniBuffer = data.Body;
            const response = await this.ocrService.OcrImage(dniBuffer, false);
            let dniNumber = response['V'] || response['E'] || response['J'];
            let expeditionDate = '';
            let dueDate = '';
            if (response['EXPEDICION F. VENCIMIENTO']) {
                const expAndVenDates = response['EXPEDICION F. VENCIMIENTO'].split(' ');
                expeditionDate = expAndVenDates[0].trim();
                dueDate = expAndVenDates[1].trim();
            }
            const dniOcr = new dni_ocr_1.DniOCR(response['NOMBRES'], expeditionDate, dueDate, response['F. NACIMIENTO'], response['APELLIDOS'], response['EDO CIVIL'], dniNumber);
            if (!dniOcr.names || !dniOcr.surnames || !dniOcr.dniNumber) {
                return new generic_response_model_1.GenericResponse({ message: 'Por favor, tome una foto más clara del documento.' }, common_1.HttpStatus.BAD_REQUEST);
            }
            return new generic_response_model_1.GenericResponse(dniOcr, common_1.HttpStatus.OK);
        }
        catch (error) {
            if (error.code === 'NoSuchKey') {
                return new generic_response_model_1.GenericResponse({ message: 'NoSuchKey: The specified key does not exist.' }, common_1.HttpStatus.NOT_FOUND);
            }
            throw new generic_exception_1.GenericException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async uploadFileToS3(file, folder, fileName) {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY_ID,
            region: process.env.AWS_REGION,
        });
        const params = {
            Bucket: process.env.AWS_BUCKET_USERS,
            Key: `${folder}/${fileName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentDisposition: 'inline',
        };
        const S3 = new AWS.S3();
        const uploadResult = await S3.upload(params).promise();
        return uploadResult.Location;
    }
    async updateUserWithDocuments(userId, userType, pictureUrl, dniUrl, rifUrl, dniRegister, rifRegister) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.userType = userType;
        user.picture = pictureUrl;
        user.dni_document = dniUrl;
        user.rif_document = rifUrl;
        user.dniRegister = dniRegister;
        user.rifRegister = rifRegister;
        return await user.save();
    }
    async findOne(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return updatedUser;
    }
    async remove(id) {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return deletedUser;
    }
    async updateProfilePicture(userId, file) {
        const folder = 'user-pictures';
        const pictureUrl = await this.uploadFileToS3(file, folder, '');
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, { picture: pictureUrl }, { new: true });
        return updatedUser;
    }
    async updateUserWithMercantileRegistry(userId, mercantileRegistryUrl) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!user.userType) {
            throw new common_1.BadRequestException('Only juridical persons can upload a mercantile registry');
        }
        user.mercantileRegistry = mercantileRegistryUrl;
        await user.save();
        return user;
    }
    async updateUserSettings(userId, updateUserSettingsDto) {
        const user = await this.userModel.findByIdAndUpdate(userId, { settings: updateUserSettingsDto }, { new: true });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(UserP_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        ocr_service_1.OCRService])
], UsersService);
//# sourceMappingURL=users.service.js.map