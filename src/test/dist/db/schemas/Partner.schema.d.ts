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
export interface PartnerDocument extends Document {
    unique_id: number;
    first_name: string;
    last_name: string;
    rif: string;
    password: string;
    email: string;
    country_phone_code: string;
    phone: string;
    country: string;
    country_id: Schema.Types.ObjectId;
    wallet_currency_code: string;
    is_vehicle_document_uploaded: boolean;
    city_id: Schema.Types.ObjectId;
    vehicle_detail: any[];
    customer_id: string;
    stripe_doc: string;
    account_id: string;
    bank_id: string;
    account_number: string;
    bank_code: string;
    city: string;
    address: string;
    picture: string;
    token: string;
    partner_company_name: string;
    government_id_proof: string;
    is_approved: number;
    wallet: number;
    rif_url: string;
    document_2: string;
    refferal_code: string;
    uid: string;
    webpush_config: Record<string, unknown>;
    last_transferred_date: Date;
    created_at: Date;
    updated_at: Date;
}
export declare const PartnerSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
    collection: string;
}, {
    first_name: string;
    last_name: string;
    email: string;
    country_phone_code: string;
    phone: string;
    token: string;
    password: string;
    picture: string;
    address: string;
    customer_id: string;
    city: string;
    country: string;
    wallet: number;
    wallet_currency_code: string;
    is_approved: number;
    account_id: string;
    account_number: string;
    bank_code: string;
    bank_id: string;
    is_vehicle_document_uploaded: boolean;
    vehicle_detail: any[];
    last_transferred_date: Date;
    rif: string;
    stripe_doc: string;
    partner_company_name: string;
    government_id_proof: string;
    rif_url: string;
    document_2: string;
    refferal_code: string;
    webpush_config: any;
    unique_id?: number;
    uid?: string;
    country_id?: import("mongoose").Types.ObjectId;
    city_id?: import("mongoose").Types.ObjectId;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    first_name: string;
    last_name: string;
    email: string;
    country_phone_code: string;
    phone: string;
    token: string;
    password: string;
    picture: string;
    address: string;
    customer_id: string;
    city: string;
    country: string;
    wallet: number;
    wallet_currency_code: string;
    is_approved: number;
    account_id: string;
    account_number: string;
    bank_code: string;
    bank_id: string;
    is_vehicle_document_uploaded: boolean;
    vehicle_detail: any[];
    last_transferred_date: Date;
    rif: string;
    stripe_doc: string;
    partner_company_name: string;
    government_id_proof: string;
    rif_url: string;
    document_2: string;
    refferal_code: string;
    webpush_config: any;
    unique_id?: number;
    uid?: string;
    country_id?: import("mongoose").Types.ObjectId;
    city_id?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    first_name: string;
    last_name: string;
    email: string;
    country_phone_code: string;
    phone: string;
    token: string;
    password: string;
    picture: string;
    address: string;
    customer_id: string;
    city: string;
    country: string;
    wallet: number;
    wallet_currency_code: string;
    is_approved: number;
    account_id: string;
    account_number: string;
    bank_code: string;
    bank_id: string;
    is_vehicle_document_uploaded: boolean;
    vehicle_detail: any[];
    last_transferred_date: Date;
    rif: string;
    stripe_doc: string;
    partner_company_name: string;
    government_id_proof: string;
    rif_url: string;
    document_2: string;
    refferal_code: string;
    webpush_config: any;
    unique_id?: number;
    uid?: string;
    country_id?: import("mongoose").Types.ObjectId;
    city_id?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const PartnerModel: import("mongoose").Model<PartnerDocument, {}, {}, {}, Document<unknown, {}, PartnerDocument> & PartnerDocument & Required<{
    _id: unknown;
}>, any>;
