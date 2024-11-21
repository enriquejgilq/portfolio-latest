/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
/// <reference types="mongoose-paginate-v2" />
import { Model } from 'mongoose';
import { CreateTruckDto } from './create-truck.dto';
import { Truck } from '../../../db/schemas/Truck.schema';
export declare class TruckService {
    private truckModel;
    constructor(truckModel: Model<Truck>);
    create(createTruckDto: CreateTruckDto): Promise<Truck>;
    updateUserFiles(userId: string, newFiles: {
        type: string;
        url: string;
        expirationDate: Date;
    }[]): Promise<void>;
    updateUserFilesP(userId: string, newFiles: {
        type: string;
        url: string;
        expirationDate: Date;
    }[]): Promise<void>;
    addPhotosToTruck(userId: string, newFiles: {
        type: string;
        url: string;
        expirationDate: Date;
    }[]): Promise<void>;
    uploadFileToS3(file: Express.Multer.File, folder: string, fileName: string): Promise<string>;
    getAllTrucks(): Promise<Truck[]>;
    getTruckById(truckId: string): Promise<Truck>;
    getTruckDimensions(truckId: string): Promise<{
        lengthCava: number;
        width: number;
        heightCava: number;
        lengthPlatform: number;
        heightPlatform: number;
        cubicMeters: number;
    }[]>;
    getTruckVehicleState(truckId: string): Promise<{
        tires: string;
        windshield: boolean;
        mirrors: boolean;
        frontLights: boolean;
        rearLights: boolean;
        brakeLights: boolean;
        signalLights: boolean;
        holesInCava: boolean;
        doors: boolean;
    }[]>;
    getTruckVehicleAccessories(truckId: string): Promise<{
        extinguisher: boolean;
        hydraulicJack: boolean;
        Pussy: boolean;
        padlock: boolean;
        rubberKey: boolean;
        spareRubber: boolean;
        toolBox: boolean;
        waxed: boolean;
        chacas: boolean;
        ropes: boolean;
        chains: boolean;
        cinchas: boolean;
    }[]>;
    getTruckDocuments(truckId: string): Promise<{
        type: string;
        url: string;
        expirationDate: Date;
    }[]>;
    getTruckPermisos(truckId: string): Promise<{
        type: string;
        url: string;
        expirationDate: Date;
    }[]>;
    updateTruck(truckId: string, updateData: Partial<Truck>): Promise<Truck>;
    deleteTruck(truckId: string, reason: string): Promise<string>;
    getExpirationDate(days: number): Date;
}
