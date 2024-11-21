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
export interface DocumentDocument extends Document {
    unique_id: number;
    countryid: Schema.Types.ObjectId;
    title: string;
    type: number;
    option: number;
    expired_date?: Date;
    issue_date: Date;
    is_issue_date: boolean;
    is_degree: boolean;
    degree: string;
    is_unique_code: boolean;
    is_expired_date: boolean;
    document_for: number;
    created_at: Date;
    updated_at: Date;
}
export declare const DocumentSchema: Schema<DocumentDocument, import("mongoose").Model<DocumentDocument, any, any, any, Document<unknown, any, DocumentDocument> & DocumentDocument & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DocumentDocument, Document<unknown, {}, import("mongoose").FlatRecord<DocumentDocument>> & import("mongoose").FlatRecord<DocumentDocument> & Required<{
    _id: unknown;
}>>;
export declare const DocumentModel: import("mongoose").Model<DocumentDocument, {}, {}, {}, Document<unknown, {}, DocumentDocument> & DocumentDocument & Required<{
    _id: unknown;
}>, any>;
