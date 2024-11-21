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
import { Schema, Document } from 'mongoose';
export interface PartnerVehicleDocumentDocument extends Document {
    documentId: Schema.Types.ObjectId;
    vehicleId: Schema.Types.ObjectId;
    name: string;
    providerId: Schema.Types.ObjectId;
    option: number;
    documentPicture: string;
    isUploaded: number;
    uniqueCode: string;
    expiredDate: Date;
    isUniqueCode: boolean;
    isExpiredDate: boolean;
    isDocumentExpired: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const PartnerVehicleDocumentSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
    collection: string;
}, {
    option: number;
    name: string;
    documentPicture: string;
    isUploaded: number;
    uniqueCode: string;
    expiredDate: Date;
    isUniqueCode: boolean;
    isExpiredDate: boolean;
    isDocumentExpired: boolean;
    documentId?: import("mongoose").Types.ObjectId;
    vehicleId?: import("mongoose").Types.ObjectId;
    providerId?: import("mongoose").Types.ObjectId;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    option: number;
    name: string;
    documentPicture: string;
    isUploaded: number;
    uniqueCode: string;
    expiredDate: Date;
    isUniqueCode: boolean;
    isExpiredDate: boolean;
    isDocumentExpired: boolean;
    documentId?: import("mongoose").Types.ObjectId;
    vehicleId?: import("mongoose").Types.ObjectId;
    providerId?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    option: number;
    name: string;
    documentPicture: string;
    isUploaded: number;
    uniqueCode: string;
    expiredDate: Date;
    isUniqueCode: boolean;
    isExpiredDate: boolean;
    isDocumentExpired: boolean;
    documentId?: import("mongoose").Types.ObjectId;
    vehicleId?: import("mongoose").Types.ObjectId;
    providerId?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const PartnerVehicleDocumentModel: import("mongoose").Model<PartnerVehicleDocumentDocument, {}, {}, {}, Document<unknown, {}, PartnerVehicleDocumentDocument> & PartnerVehicleDocumentDocument & Required<{
    _id: unknown;
}>, any>;
