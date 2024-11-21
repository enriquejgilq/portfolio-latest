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
exports.TruckService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Truck_schema_1 = require("../../../db/schemas/Truck.schema");
const AWS = require("aws-sdk");
const moment = require("moment");
let TruckService = class TruckService {
    constructor(truckModel) {
        this.truckModel = truckModel;
    }
    async create(createTruckDto) {
        const newTruck = new this.truckModel(createTruckDto);
        return newTruck.save();
    }
    async updateUserFiles(userId, newFiles) {
        const user = await this.truckModel.findById(userId);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        for (const newFile of newFiles) {
            const existingFileIndex = user.documents.findIndex(doc => doc.type === newFile.type);
            if (existingFileIndex > -1) {
                user.documents[existingFileIndex] = newFile;
            }
            else {
                if (user.documents.length < 4) {
                    user.documents.push(newFile);
                }
                else {
                    throw new common_1.BadRequestException('Cannot upload more than 4 documents');
                }
            }
        }
        await user.save();
    }
    async updateUserFilesP(userId, newFiles) {
        const user = await this.truckModel.findById(userId);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        for (const newFile of newFiles) {
            const existingFileIndex = user.permisos.findIndex(doc => doc.type === newFile.type);
            if (existingFileIndex > -1) {
                user.permisos[existingFileIndex] = newFile;
            }
            else {
                if (user.permisos.length < 4) {
                    user.permisos.push(newFile);
                }
                else {
                    throw new common_1.BadRequestException('Cannot upload more than 4 documents');
                }
            }
        }
        await user.save();
    }
    async addPhotosToTruck(userId, newFiles) {
        const user = await this.truckModel.findById(userId);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        for (const newFile of newFiles) {
            const existingFileIndex = user.permisos.findIndex(doc => doc.type === newFile.type);
            if (existingFileIndex > -1) {
                user.photo[existingFileIndex] = newFile;
            }
            else {
                if (user.photo.length < 4) {
                    user.photo.push(newFile);
                }
                else {
                    throw new common_1.BadRequestException('Cannot upload more than 4 documents');
                }
            }
        }
        await user.save();
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
    async getAllTrucks() {
        return this.truckModel.find().exec();
    }
    async getTruckById(truckId) {
        const truck = await this.truckModel.findById(truckId).exec();
        if (!truck) {
            throw new common_1.NotFoundException(`Truck with ID ${truckId} not found`);
        }
        return truck;
    }
    async getTruckDimensions(truckId) {
        const truck = await this.getTruckById(truckId);
        return truck.dimensions;
    }
    async getTruckVehicleState(truckId) {
        const truck = await this.getTruckById(truckId);
        return truck.vehicleState;
    }
    async getTruckVehicleAccessories(truckId) {
        const truck = await this.getTruckById(truckId);
        return truck.vehicleAccessories;
    }
    async getTruckDocuments(truckId) {
        const truck = await this.getTruckById(truckId);
        return truck.documents;
    }
    async getTruckPermisos(truckId) {
        const truck = await this.getTruckById(truckId);
        return truck.permisos;
    }
    async updateTruck(truckId, updateData) {
        const updatedTruck = await this.truckModel.findByIdAndUpdate(truckId, updateData, { new: true }).exec();
        if (!updatedTruck) {
            throw new common_1.NotFoundException(`Truck with ID ${truckId} not found`);
        }
        return updatedTruck;
    }
    async deleteTruck(truckId, reason) {
        const deletedTruck = await this.truckModel.findByIdAndUpdate(truckId, { isDeleted: true, deletionReason: reason }, { new: true }).exec();
        if (!deletedTruck) {
            throw new common_1.NotFoundException(`Truck with ID ${truckId} not found`);
        }
        return `Truck ${truckId} deleted successfully due to: ${reason}`;
    }
    getExpirationDate(days) {
        return moment().add(days, 'days').toDate();
    }
};
exports.TruckService = TruckService;
exports.TruckService = TruckService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Truck_schema_1.Truck.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TruckService);
//# sourceMappingURL=truck.service.js.map