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
export interface ProviderDocumentDocument extends Document {
    document_id: Schema.Types.ObjectId;
    name: string;
    provider_id: Schema.Types.ObjectId;
    option: number;
    document_picture: string;
    is_uploaded: number;
    unique_code: string;
    is_unique_code: boolean;
    expired_date: Date;
    issue_date: Date;
    is_issue_date: boolean;
    is_degree: boolean;
    degree: string;
    is_expired_date: boolean;
    is_document_expired: boolean;
    created_at: Date;
    updated_at: Date;
}
export declare const ProviderDocumentSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
    collection: string;
}, {
    option: number;
    expired_date: Date;
    issue_date: Date;
    is_issue_date: boolean;
    is_degree: boolean;
    degree: string;
    is_unique_code: boolean;
    is_expired_date: boolean;
    created_at: Date;
    updated_at: Date;
    name: string;
    document_picture: string;
    is_uploaded: number;
    unique_code: string;
    is_document_expired: boolean;
    document_id?: import("mongoose").Types.ObjectId;
    provider_id?: import("mongoose").Types.ObjectId;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    option: number;
    expired_date: Date;
    issue_date: Date;
    is_issue_date: boolean;
    is_degree: boolean;
    degree: string;
    is_unique_code: boolean;
    is_expired_date: boolean;
    created_at: Date;
    updated_at: Date;
    name: string;
    document_picture: string;
    is_uploaded: number;
    unique_code: string;
    is_document_expired: boolean;
    document_id?: import("mongoose").Types.ObjectId;
    provider_id?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    option: number;
    expired_date: Date;
    issue_date: Date;
    is_issue_date: boolean;
    is_degree: boolean;
    degree: string;
    is_unique_code: boolean;
    is_expired_date: boolean;
    created_at: Date;
    updated_at: Date;
    name: string;
    document_picture: string;
    is_uploaded: number;
    unique_code: string;
    is_document_expired: boolean;
    document_id?: import("mongoose").Types.ObjectId;
    provider_id?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const ProviderDocumentModel: import("mongoose").Model<ProviderDocumentDocument, {}, {}, {}, Document<unknown, {}, ProviderDocumentDocument> & ProviderDocumentDocument & Required<{
    _id: unknown;
}>, any>;
