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
export interface CityDocument extends Document {
    countryid: Schema.Types.ObjectId;
    countryname: string;
    full_cityname: string;
    timezone: string;
    cityname: string;
    is_use_city_boundary: boolean;
    city_locations: any;
    payment_gateway: number[];
    unit: number;
    is_payment_mode_cash: number;
    is_payment_mode_card: number;
    is_payment_mode_apple_pay: number;
    isPromoApplyForCash: number;
    isPromoApplyForCard: number;
    isBusiness: number;
    airport_business: number;
    city_business: number;
    zone_business: number;
    isCountryBusiness: number;
    destination_city: Schema.Types.ObjectId[];
    citycode: string;
    cityLatLong: number[];
    cityRadius: number;
    is_ask_user_for_fixed_fare: boolean;
    provider_min_wallet_amount_set_for_received_cash_request: number;
    is_check_provider_wallet_amount_for_received_cash_request: boolean;
    is_provider_earning_set_in_wallet_on_cash_payment: boolean;
    is_provider_earning_set_in_wallet_on_other_payment: boolean;
    is_caracas: boolean;
    daily_cron_date?: Date;
    created_at: Date;
    updated_at: Date;
}
export declare const CitySchema: Schema<CityDocument, import("mongoose").Model<CityDocument, any, any, any, Document<unknown, any, CityDocument> & CityDocument & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CityDocument, Document<unknown, {}, import("mongoose").FlatRecord<CityDocument>> & import("mongoose").FlatRecord<CityDocument> & Required<{
    _id: unknown;
}>>;
export declare const CityModel: import("mongoose").Model<CityDocument, {}, {}, {}, Document<unknown, {}, CityDocument> & CityDocument & Required<{
    _id: unknown;
}>, any>;
