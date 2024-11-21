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
import { Document } from 'mongoose';
declare class Dimension {
    lengthCava: number;
    width: number;
    heightCava: number;
    lengthPlatform: number;
    heightPlatform: number;
    cubicMeters: number;
}
declare class VehicleState {
    tires: string;
    windshield: boolean;
    mirrors: boolean;
    frontLights: boolean;
    rearLights: boolean;
    brakeLights: boolean;
    signalLights: boolean;
    holesInCava: boolean;
    doors: boolean;
}
declare class VehicleAccessories {
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
}
export declare class Truck extends Document {
    name: string;
    typeId: string;
    brandId: string;
    modelId: string;
    plate: string;
    temperature: number;
    capacityPallets: number;
    capacityKilos: number;
    isDeleted: boolean;
    deletionReason: string;
    createdBy?: string;
    dimensions: Dimension[];
    vehicleState: VehicleState[];
    vehicleAccessories: VehicleAccessories[];
    documents: {
        type: string;
        url: string;
        expirationDate: Date;
    }[];
    permisos: {
        type: string;
        url: string;
        expirationDate: Date;
    }[];
    photo: {
        type: string;
        url: string;
    }[];
}
export declare const TruckSchema: import("mongoose").Schema<Truck, import("mongoose").Model<Truck, any, any, any, Document<unknown, any, Truck> & Truck & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Truck, Document<unknown, {}, import("mongoose").FlatRecord<Truck>> & import("mongoose").FlatRecord<Truck> & Required<{
    _id: unknown;
}>>;
export {};
