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
export interface CorporateDocument extends Document {
    unique_id: number;
    company_name: string;
    rif: string;
    name: string;
    password: string;
    email: string;
    country_phone_code: string;
    phone: string;
    address: string;
    country_id: Schema.Types.ObjectId;
    country_name: string;
    wallet_currency_code: string;
    customer_id: string;
    stripe_doc: string;
    account_id: string;
    bank_id: string;
    token: string;
    is_approved: number;
    wallet: number;
    refferal_code: string;
    last_transferred_date: Date;
    is_own_service_type: number;
    picture: string;
    rif_url: string;
    document_2: string;
    alt_phone: string;
    uid: string;
    corporate_type_id: Schema.Types.ObjectId;
    corporate_type_userid: Schema.Types.ObjectId;
    url_array: string[];
    is_trip_approve: number;
    is_subcorporate_admin: number;
    created_at: Date;
    updated_at: Date;
    active_api: boolean;
    api_key: string;
}
export declare const CorporateModel: import("mongoose").Model<CorporateDocument, {}, {}, {}, Document<unknown, {}, CorporateDocument> & CorporateDocument & Required<{
    _id: unknown;
}>, any>;
