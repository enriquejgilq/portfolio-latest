/// <reference types="node" />
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
export interface UserDocument extends Document {
    unique_id: number;
    user_type: number;
    user_type_id: Schema.Types.ObjectId | null;
    first_name: string;
    last_name: string;
    email: string;
    country_phone_code: string;
    phone: string;
    gender: string;
    token: string;
    password: string;
    picture: string;
    device_token: string;
    device_type: string;
    corporate_ids: string[];
    bio: string;
    favourite_providers: Schema.Types.ObjectId[];
    address: string;
    zipcode: string;
    social_unique_id: string;
    social_ids: string[];
    login_by: string;
    device_timezone: string;
    customer_id: string;
    city: string;
    is_document_uploaded: number;
    referred_by: Schema.Types.ObjectId | null;
    is_referral: number;
    country: string;
    total_referrals: number;
    refferal_credit: number;
    corporate_wallet_limit: number;
    wallet: number;
    wallet_currency_code: string;
    is_use_wallet: number;
    current_trip_id: Schema.Types.ObjectId | null;
    is_approved: number;
    promo_count: number;
    home_address: string;
    work_address: string;
    company_details: Record<string, any> | null;
    home_location: [number, number];
    work_location: [number, number];
    total_request: number;
    completed_request: number;
    img: {
        data: Buffer;
        contentType: string;
    };
    cancelled_request: number;
    app_version: string;
    created_at?: Date;
    updated_at?: Date;
    referral_code: string;
    rate: number;
    rate_count: number;
    uid: string;
}
export declare const UserModel: import("mongoose").Model<UserDocument, {}, {}, {}, Document<unknown, {}, UserDocument> & UserDocument & Required<{
    _id: unknown;
}>, any>;
