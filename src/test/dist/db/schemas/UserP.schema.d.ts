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
export type UserDocument = User & Document;
export declare class User {
    user_type: number;
    user_type_id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    country_phone_code: string;
    phone: string;
    token: string;
    password: string;
    picture: string;
    device_token: string;
    device_type: string;
    corporate_ids: [
        {
            corporate_id: string;
            status: number;
        }
    ];
    favourite_providers: string[];
    social_unique_id: number;
    social_ids: string[];
    login_by: string;
    device_timezone: string;
    customer_id: string;
    is_document_uploaded: number;
    referred_by: string;
    is_referral: number;
    country: string;
    total_referrals: number;
    refferal_credit: number;
    corporate_wallet_limit: number;
    wallet: number;
    wallet_currency_code: string;
    is_use_wallet: number;
    current_trip_id: string;
    is_approved: number;
    promo_count: number;
    home_address: string;
    work_address: string;
    home_location: number[];
    work_location: number[];
    total_request: number;
    completed_request: number;
    cancelled_request: number;
    app_version: string;
    referral_code: string;
    rate: number;
    rate_count: number;
    created_at: Date;
    updated_at: Date;
    unique_id: number;
    uid: string;
    address: string;
    city: string;
    bio: string;
    gender: string;
    zipcode: string;
    dni: string;
    rif: string;
    rif_document: string;
    dni_document: string;
    role: string;
    userType: boolean;
    mercantileRegistry?: string;
    dniRegister?: {
        names: string;
        expedition: string;
        expiration: string;
        surnames: string;
        dniNumber: string;
    };
    rifRegister?: {
        rifNumberAndNames: string;
        registrationDate: string;
        dueDate: string;
        fiscalAddress: string;
    };
    settings: {
        alertSound: boolean;
        driverAlert: boolean;
        language: string;
    };
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;
