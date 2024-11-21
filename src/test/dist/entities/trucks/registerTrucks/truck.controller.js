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
exports.TruckController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const truck_service_1 = require("./truck.service");
const create_truck_dto_1 = require("./create-truck.dto");
let TruckController = class TruckController {
    constructor(truckService) {
        this.truckService = truckService;
    }
    async createTruck(createTruckDto, req) {
        return this.truckService.create(createTruckDto);
    }
    async uploadFiles(userId, files, body) {
        const fileDetails = [];
        if (body.types.length !== files.length || body.expirationDates.length !== files.length) {
            throw new common_1.BadRequestException('Each file must have a corresponding type and expiration date');
        }
        for (const [index, file] of files.entries()) {
            const fileName = `${body.types[index]}_${Date.now()}_${file.originalname}`;
            const fileUrl = await this.truckService.uploadFileToS3(file, 'truck-documents', fileName);
            const expirationDate = new Date(body.expirationDates[index]);
            const type = body.types[index];
            if (!['insurance_policy', 'health_registration', 'origin_certification', 'circulation_license'].includes(type)) {
                throw new common_1.BadRequestException(`Invalid document type: ${type}`);
            }
            fileDetails.push({
                type: type,
                url: fileUrl,
                expirationDate: expirationDate,
            });
        }
        await this.truckService.updateUserFiles(userId, fileDetails);
        return {
            message: 'Files uploaded successfully',
            files: fileDetails,
        };
    }
    async uploadFilesPermisos(userId, files, body) {
        const fileDetails = [];
        if (body.types.length !== files.length || body.expirationDates.length !== files.length) {
            throw new common_1.BadRequestException('Each file must have a corresponding type and expiration date');
        }
        for (const [index, file] of files.entries()) {
            const fileName = `${body.types[index]}_${Date.now()}_${file.originalname}`;
            const fileUrl = await this.truckService.uploadFileToS3(file, 'permits-documents', fileName);
            const expirationDate = new Date(body.expirationDates[index]);
            const type = body.types[index];
            if (!['ROCT', 'ISOpesca', 'RACDA', 'RESQUIN'].includes(type)) {
                throw new common_1.BadRequestException(`Invalid document type: ${type}`);
            }
            fileDetails.push({
                type: type,
                url: fileUrl,
                expirationDate: expirationDate,
            });
        }
        await this.truckService.updateUserFilesP(userId, fileDetails);
        return {
            message: 'Files uploaded successfully',
            files: fileDetails,
        };
    }
    async uploadTruckPhotos(truckId, files, body) {
        const fileDetails = [];
        if (files.length === 0) {
            throw new common_1.BadRequestException('At least one file must be uploaded');
        }
        if (body.types.length !== files.length) {
            throw new common_1.BadRequestException('Each file must have a corresponding type');
        }
        const validTypes = ['frontal', 'later', 'side1', 'side2'];
        for (const type of body.types) {
            if (!validTypes.includes(type)) {
                throw new common_1.BadRequestException(`Invalid photo type: ${type}`);
            }
        }
        for (const [index, file] of files.entries()) {
            const type = body.types[index];
            const fileName = `${type}_truck_photo_${Date.now()}_${file.originalname}`;
            const fileUrl = await this.truckService.uploadFileToS3(file, 'truck-photos', fileName);
            fileDetails.push({
                type: type,
                url: fileUrl,
            });
        }
        const updatedTruck = await this.truckService.addPhotosToTruck(truckId, fileDetails);
        return {
            message: 'Files uploaded successfully',
            files: fileDetails,
        };
    }
    async getAllTrucks() {
        const trucks = await this.truckService.getAllTrucks();
        return {
            message: 'List of all trucks',
            trucks: trucks,
        };
    }
    async getTruckById(truckId) {
        const truck = await this.truckService.getTruckById(truckId);
        return {
            message: `Details of truck ${truckId}`,
            truck: truck,
        };
    }
    async getTruckDimensions(truckId) {
        const dimensions = await this.truckService.getTruckDimensions(truckId);
        return {
            message: `Dimensions of truck ${truckId}`,
            dimensions: dimensions,
        };
    }
    async getTruckVehicleState(truckId) {
        const vehicleState = await this.truckService.getTruckVehicleState(truckId);
        return {
            message: `Vehicle state of truck ${truckId}`,
            vehicleState: vehicleState,
        };
    }
    async getTruckVehicleAccessories(truckId) {
        const vehicleAccessories = await this.truckService.getTruckVehicleAccessories(truckId);
        return {
            message: `Vehicle accessories of truck ${truckId}`,
            vehicleAccessories: vehicleAccessories,
        };
    }
    async getTruckDocuments(truckId) {
        const documents = await this.truckService.getTruckDocuments(truckId);
        return {
            message: `Documents of truck ${truckId}`,
            documents: documents,
        };
    }
    async getTruckPermisos(truckId) {
        const permisos = await this.truckService.getTruckPermisos(truckId);
        return {
            message: `Permits of truck ${truckId}`,
            permisos: permisos,
        };
    }
    async updateTruck(truckId, updateData) {
        const updatedTruck = await this.truckService.updateTruck(truckId, updateData);
        return {
            message: `Truck ${truckId} updated successfully`,
            truck: updatedTruck,
        };
    }
    async deleteTruck(truckId, reason) {
        const message = await this.truckService.deleteTruck(truckId, reason);
        return {
            message,
        };
    }
};
exports.TruckController = TruckController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_truck_dto_1.CreateTruckDto, Object]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "createTruck", null);
__decorate([
    (0, common_1.Post)(':userId/upload-files'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 4)),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Post)(':truckId/upload-permisos'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 4)),
    __param(0, (0, common_1.Param)('truckId')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "uploadFilesPermisos", null);
__decorate([
    (0, common_1.Post)(':truckId/upload-photos'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 4)),
    __param(0, (0, common_1.Param)('truckId')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "uploadTruckPhotos", null);
__decorate([
    (0, common_1.Get)('allTrucks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "getAllTrucks", null);
__decorate([
    (0, common_1.Get)(':truckId'),
    __param(0, (0, common_1.Param)('truckId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "getTruckById", null);
__decorate([
    (0, common_1.Get)(':truckId/dimensions'),
    __param(0, (0, common_1.Param)('truckId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "getTruckDimensions", null);
__decorate([
    (0, common_1.Get)(':truckId/vehicle-state'),
    __param(0, (0, common_1.Param)('truckId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "getTruckVehicleState", null);
__decorate([
    (0, common_1.Get)(':truckId/vehicle-accessories'),
    __param(0, (0, common_1.Param)('truckId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "getTruckVehicleAccessories", null);
__decorate([
    (0, common_1.Get)(':truckId/documents'),
    __param(0, (0, common_1.Param)('truckId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "getTruckDocuments", null);
__decorate([
    (0, common_1.Get)(':truckId/permissions'),
    __param(0, (0, common_1.Param)('truckId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "getTruckPermisos", null);
__decorate([
    (0, common_1.Put)(':truckId'),
    __param(0, (0, common_1.Param)('truckId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "updateTruck", null);
__decorate([
    (0, common_1.Delete)(':truckId'),
    __param(0, (0, common_1.Param)('truckId')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TruckController.prototype, "deleteTruck", null);
exports.TruckController = TruckController = __decorate([
    (0, common_1.Controller)('trucks'),
    __metadata("design:paramtypes", [truck_service_1.TruckService])
], TruckController);
//# sourceMappingURL=truck.controller.js.map