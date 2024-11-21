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
export interface ZoneValueDocument extends Document {
    cityid: Schema.Types.ObjectId;
    service_type_id: Schema.Types.ObjectId;
    from: Schema.Types.ObjectId;
    to: Schema.Types.ObjectId;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const ZoneValueSchema: Schema<ZoneValueDocument, import("mongoose").Model<ZoneValueDocument, any, any, any, Document<unknown, any, ZoneValueDocument> & ZoneValueDocument & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ZoneValueDocument, Document<unknown, {}, import("mongoose").FlatRecord<ZoneValueDocument>> & import("mongoose").FlatRecord<ZoneValueDocument> & Required<{
    _id: unknown;
}>>;
export declare const ZoneValueModel: import("mongoose").Model<ZoneValueDocument, {}, {}, {}, Document<unknown, {}, ZoneValueDocument> & ZoneValueDocument & Required<{
    _id: unknown;
}>, any>;
