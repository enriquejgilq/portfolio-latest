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
export interface ProviderVehicleDocumentDocument extends Document {
    document_id: Schema.Types.ObjectId;
    vehicle_id: Schema.Types.ObjectId;
    name: string;
    provider_id: Schema.Types.ObjectId;
    option: number;
    document_picture: string;
    is_uploaded: number;
    unique_code: string;
    expired_date: Date;
    is_unique_code: boolean;
    is_expired_date: boolean;
    is_document_expired: boolean;
    created_at?: Date;
    updated_at?: Date;
}
export declare const ProviderVehicleDocumentSchema: Schema<ProviderVehicleDocumentDocument, import("mongoose").Model<ProviderVehicleDocumentDocument, any, any, any, Document<unknown, any, ProviderVehicleDocumentDocument> & ProviderVehicleDocumentDocument & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProviderVehicleDocumentDocument, Document<unknown, {}, import("mongoose").FlatRecord<ProviderVehicleDocumentDocument>> & import("mongoose").FlatRecord<ProviderVehicleDocumentDocument> & Required<{
    _id: unknown;
}>>;
export declare const ProviderVehicleDocumentModel: import("mongoose").Model<ProviderVehicleDocumentDocument, {}, {}, {}, Document<unknown, {}, ProviderVehicleDocumentDocument> & ProviderVehicleDocumentDocument & Required<{
    _id: unknown;
}>, any>;
