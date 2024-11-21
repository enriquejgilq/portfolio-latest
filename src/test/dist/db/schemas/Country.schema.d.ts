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
export interface CountryDocument extends Document {
    countryname: string;
    countrycode: string;
    alpha2: string;
    currency: string;
    flag_url: string;
    currencycode: string;
    currencysign: string;
    countrytimezone: string;
    country_all_timezone: string[];
    payment_gateways: any[];
    countryphonecode: string;
    isBusiness: number;
    referral_bonus_to_user: number;
    bonus_to_providerreferral: number;
    referral_bonus_to_provider: number;
    bonus_to_userreferral: number;
    phone_number_min_length: number;
    phone_number_length: number;
    is_referral: boolean;
    userreferral: number;
    is_provider_referral: boolean;
    providerreferral: number;
    default_selected: boolean;
    is_auto_transfer: boolean;
    auto_transfer_day: number;
    daily_cron_date?: Date;
    created_at?: Date;
    updated_at?: Date;
}
export declare const CountrySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
    collection: string;
}, {
    created_at: Date;
    updated_at: Date;
    countryname: string;
    countrycode: string;
    alpha2: string;
    currency: string;
    flag_url: string;
    currencycode: string;
    currencysign: string;
    countrytimezone: string;
    country_all_timezone: string[];
    payment_gateways: any[];
    countryphonecode: string;
    isBusiness: number;
    referral_bonus_to_user: number;
    bonus_to_providerreferral: number;
    referral_bonus_to_provider: number;
    bonus_to_userreferral: number;
    phone_number_min_length: number;
    phone_number_length: number;
    is_referral: boolean;
    userreferral: number;
    is_provider_referral: boolean;
    providerreferral: number;
    default_selected: boolean;
    is_auto_transfer: boolean;
    auto_transfer_day: number;
    daily_cron_date?: Date;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    created_at: Date;
    updated_at: Date;
    countryname: string;
    countrycode: string;
    alpha2: string;
    currency: string;
    flag_url: string;
    currencycode: string;
    currencysign: string;
    countrytimezone: string;
    country_all_timezone: string[];
    payment_gateways: any[];
    countryphonecode: string;
    isBusiness: number;
    referral_bonus_to_user: number;
    bonus_to_providerreferral: number;
    referral_bonus_to_provider: number;
    bonus_to_userreferral: number;
    phone_number_min_length: number;
    phone_number_length: number;
    is_referral: boolean;
    userreferral: number;
    is_provider_referral: boolean;
    providerreferral: number;
    default_selected: boolean;
    is_auto_transfer: boolean;
    auto_transfer_day: number;
    daily_cron_date?: Date;
}>> & import("mongoose").FlatRecord<{
    created_at: Date;
    updated_at: Date;
    countryname: string;
    countrycode: string;
    alpha2: string;
    currency: string;
    flag_url: string;
    currencycode: string;
    currencysign: string;
    countrytimezone: string;
    country_all_timezone: string[];
    payment_gateways: any[];
    countryphonecode: string;
    isBusiness: number;
    referral_bonus_to_user: number;
    bonus_to_providerreferral: number;
    referral_bonus_to_provider: number;
    bonus_to_userreferral: number;
    phone_number_min_length: number;
    phone_number_length: number;
    is_referral: boolean;
    userreferral: number;
    is_provider_referral: boolean;
    providerreferral: number;
    default_selected: boolean;
    is_auto_transfer: boolean;
    auto_transfer_day: number;
    daily_cron_date?: Date;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const CountryModel: import("mongoose").Model<CountryDocument, {}, {}, {}, Document<unknown, {}, CountryDocument> & CountryDocument & Required<{
    _id: unknown;
}>, any>;
