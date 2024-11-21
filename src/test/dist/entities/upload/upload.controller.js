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
exports.PhotoController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Upload_schema_1 = require("../../db/schemas/Upload.schema");
const multer_1 = require("multer");
const path_1 = require("path");
let PhotoController = class PhotoController {
    constructor(photoModel) {
        this.photoModel = photoModel;
    }
    async uploadPhoto(file, body) {
        const { filename, contentType } = body;
        if (!file) {
            throw new Error('File not uploaded');
        }
        const photo = new this.photoModel({
            filename: file.filename || filename,
            contentType: file.mimetype || contentType,
            data: file.buffer,
        });
        return await photo.save();
    }
};
exports.PhotoController = PhotoController;
__decorate([
    (0, common_1.Post)('photos'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('data', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                cb(new Error('Only image files are allowed!'), false);
            }
            else {
                cb(null, true);
            }
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "uploadPhoto", null);
exports.PhotoController = PhotoController = __decorate([
    (0, common_1.Controller)('upload'),
    __param(0, (0, mongoose_1.InjectModel)(Upload_schema_1.Photo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PhotoController);
//# sourceMappingURL=upload.controller.js.map