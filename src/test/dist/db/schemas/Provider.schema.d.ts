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
export interface ProviderDocument extends Document {
    provider_type: number;
    provider_type_id: Schema.Types.ObjectId;
    unique_id: number;
    first_name: string;
    languages: Schema.Types.ObjectId[];
    received_trip_from_gender: string[];
    is_trip: Schema.Types.ObjectId[];
    is_near_trip: Schema.Types.ObjectId[];
    is_near_available: number;
    is_go_home: number;
    is_ride_share: number;
    wallet: number;
    wallet_currency_code: string;
    last_name: string;
    email: string;
    gender: string;
    country_phone_code: string;
    customer_id: string;
    is_documents_expired: boolean;
    account_id: string;
    account_number: string;
    bank_code: string;
    bank_id: string;
    partner_name: string;
    is_vehicle_document_uploaded: boolean;
    phone: string;
    password: string;
    picture: string;
    token: string;
    service_type: Schema.Types.ObjectId;
    admintypeid: Schema.Types.ObjectId;
    car_model: string;
    car_number: string;
    device_token: string;
    device_type: string;
    app_version: string;
    bio: string;
    address: string;
    address_location: number[];
    zipcode: string;
    social_unique_id: string;
    social_ids: string[];
    login_by: string;
    device_timezone: string;
    bearing: number;
    city: string;
    cityid: Schema.Types.ObjectId;
    country: string;
    country_id: Schema.Types.ObjectId;
    is_use_google_distance: boolean;
    vehicle_detail: any;
    destinationLocation: any;
    providerPreviousLocation: number[];
    providerLocation: number[];
    is_available: number;
    total_request: number;
    accepted_request: number;
    completed_request: number;
    cancelled_request: number;
    rejected_request: number;
    is_active: number;
    is_approved: number;
    is_partner_approved_by_admin: number;
    is_document_uploaded: number;
    device_unique_code: string;
    rate: number;
    rate_count: number;
    partner_ids: any;
    start_online_time: Date;
    referred_by: Schema.Types.ObjectId;
    is_referral: number;
    referral_code: string;
    total_referrals: number;
    provider_trip_dates: any;
    is_truck_owner: number;
    zone_queue_id: Schema.Types.ObjectId;
    uid: string;
    location_updated_time: Date;
    last_transferred_date: Date;
    created_at: Date;
    updated_at: Date;
}
export declare const ProviderModel: import("mongoose").Model<ProviderDocument, {}, {}, {}, Document<unknown, {}, ProviderDocument> & ProviderDocument & Required<{
    _id: unknown;
}>, any>;
