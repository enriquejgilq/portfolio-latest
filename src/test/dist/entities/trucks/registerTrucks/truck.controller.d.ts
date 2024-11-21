/// <reference types="multer" />
import { TruckService } from './truck.service';
import { CreateTruckDto } from './create-truck.dto';
import { Truck } from '../../../db/schemas/Truck.schema';
export declare class TruckController {
    private readonly truckService;
    constructor(truckService: TruckService);
    createTruck(createTruckDto: CreateTruckDto, req: any): Promise<any>;
    uploadFiles(userId: string, files: Express.Multer.File[], body: {
        types: string[];
        expirationDates: string[];
    }): Promise<{
        message: string;
        files: any[];
    }>;
    uploadFilesPermisos(userId: string, files: Express.Multer.File[], body: {
        types: string[];
        expirationDates: string[];
    }): Promise<{
        message: string;
        files: any[];
    }>;
    uploadTruckPhotos(truckId: string, files: Express.Multer.File[], body: {
        types: string[];
    }): Promise<{
        message: string;
        files: any[];
    }>;
    getAllTrucks(): Promise<{
        message: string;
        trucks: Truck[];
    }>;
    getTruckById(truckId: string): Promise<{
        message: string;
        truck: Truck;
    }>;
    getTruckDimensions(truckId: string): Promise<{
        message: string;
        dimensions: {
            lengthCava: number;
            width: number;
            heightCava: number;
            lengthPlatform: number;
            heightPlatform: number;
            cubicMeters: number;
        }[];
    }>;
    getTruckVehicleState(truckId: string): Promise<{
        message: string;
        vehicleState: {
            tires: string;
            windshield: boolean;
            mirrors: boolean;
            frontLights: boolean;
            rearLights: boolean;
            brakeLights: boolean;
            signalLights: boolean;
            holesInCava: boolean;
            doors: boolean;
        }[];
    }>;
    getTruckVehicleAccessories(truckId: string): Promise<{
        message: string;
        vehicleAccessories: {
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
        }[];
    }>;
    getTruckDocuments(truckId: string): Promise<{
        message: string;
        documents: {
            type: string;
            url: string;
            expirationDate: Date;
        }[];
    }>;
    getTruckPermisos(truckId: string): Promise<{
        message: string;
        permisos: {
            type: string;
            url: string;
            expirationDate: Date;
        }[];
    }>;
    updateTruck(truckId: string, updateData: Partial<Truck>): Promise<{
        message: string;
        truck: Truck;
    }>;
    deleteTruck(truckId: string, reason: string): Promise<{
        message: string;
    }>;
}
