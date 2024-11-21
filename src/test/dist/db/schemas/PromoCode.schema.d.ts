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
export interface PromoCodeDocument extends Document {
    promocode: string;
    code_value: number;
    code_type: number;
    code_uses: number;
    user_used_promo: number;
    state: number;
    completed_trips_type: number;
    completed_trips_value: number;
    countryid: Schema.Types.ObjectId;
    cityid: Schema.Types.ObjectId[];
    start_date: Date;
    code_expiry: Date;
    created_at: Date;
    updated_at: Date;
}
export declare const PromoCodeSchema: Schema<PromoCodeDocument, import("mongoose").Model<PromoCodeDocument, any, any, any, Document<unknown, any, PromoCodeDocument> & PromoCodeDocument & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PromoCodeDocument, Document<unknown, {}, import("mongoose").FlatRecord<PromoCodeDocument>> & import("mongoose").FlatRecord<PromoCodeDocument> & Required<{
    _id: unknown;
}>>;
export declare const PromoCodeModel: import("mongoose").Model<PromoCodeDocument, {}, {}, {}, Document<unknown, {}, PromoCodeDocument> & PromoCodeDocument & Required<{
    _id: unknown;
}>, any>;
