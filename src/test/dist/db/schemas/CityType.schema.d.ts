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
export interface CityTypeDocument extends Document {
    countryid: Schema.Types.ObjectId;
    is_hide: number;
    surge_multiplier: number;
    surge_start_hour: number;
    surge_end_hour: number;
    is_surge_hours: number;
    is_zone: number;
    rich_area_surge: any[];
    surge_hours: {
        is_surge: boolean;
        day: string;
        day_time: any[];
    }[];
    is_business: number;
    countryname: string;
    cityid: Schema.Types.ObjectId;
    cityname: string;
    typeid: Schema.Types.ObjectId;
    type_image: string;
    min_fare: number;
    provider_profit: number;
    typename: string;
    city_id: Schema.Types.ObjectId;
    is_car_rental_business: number;
    car_rental_ids: Schema.Types.ObjectId[];
    base_price_distance: number;
    base_price_time: number;
    base_price: number;
    price_per_unit_distance: number;
    price_for_total_time: number;
    waiting_time_start_after_minute: number;
    price_for_waiting_time: number;
    waiting_time_start_after_minute_multiple_stops: number;
    price_for_waiting_time_multiple_stops: number;
    tax: number;
    max_space: number;
    cancellation_fee: number;
    user_miscellaneous_fee: number;
    provider_miscellaneous_fee: number;
    user_tax: number;
    provider_tax: number;
    is_ride_share: number;
    model_pricing_ids: Schema.Types.ObjectId[];
    modelid: any[];
    serviceid: any[];
    capacityid: any[];
    price_per_km_a: number;
    price_per_km_b: number;
    price_per_km_c: number;
    price_per_km_d: number;
    price_per_km_e: number;
    price_per_km_f: number;
    price_per_km_g: number;
    price_per_km_h: number;
    price_per_km_i: number;
    price_per_km_j: number;
    price_per_km_k: number;
    price_per_km_l: number;
    price_per_km_m: number;
    price_per_km_n: number;
    price_per_km_o: number;
    price_per_km_p: number;
    price_per_km_q: number;
    price_per_km_r: number;
    price_per_km_s: number;
    price_per_km_t: number;
    price_per_km_u: number;
    price_per_km_v: number;
    price_per_km_w: number;
    price_per_km_y: number;
    cost_per_stop_inside_city: number;
    cost_per_stop_outside_city: number;
    cost_per_helper: number;
    cost_travel_insurance: number;
    fixed_fees: number;
    model_type: number;
    user_type_id: Schema.Types.ObjectId;
    user_type: number;
    free_stops: number;
    created_at: Date;
    updated_at: Date;
    zone_ids: Schema.Types.ObjectId[];
    night_shift: number;
    boat_ticket: number;
}
export declare const CityTypeSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    collection: string;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    created_at: Date;
    updated_at: Date;
    countryname: string;
    user_type: number;
    is_ride_share: number;
    is_hide: number;
    surge_multiplier: number;
    surge_start_hour: number;
    surge_end_hour: number;
    is_surge_hours: number;
    is_zone: number;
    rich_area_surge: any[];
    surge_hours: any[];
    is_business: number;
    cityname: string;
    type_image: string;
    min_fare: number;
    provider_profit: number;
    typename: string;
    is_car_rental_business: number;
    car_rental_ids: import("mongoose").Types.ObjectId[];
    base_price_distance: number;
    base_price_time: number;
    base_price: number;
    price_per_unit_distance: number;
    price_for_total_time: number;
    waiting_time_start_after_minute: number;
    price_for_waiting_time: number;
    waiting_time_start_after_minute_multiple_stops: number;
    price_for_waiting_time_multiple_stops: number;
    tax: number;
    max_space: number;
    cancellation_fee: number;
    user_miscellaneous_fee: number;
    provider_miscellaneous_fee: number;
    user_tax: number;
    provider_tax: number;
    model_pricing_ids: import("mongoose").Types.ObjectId[];
    modelid: any[];
    serviceid: any[];
    capacityid: any[];
    price_per_km_a: number;
    price_per_km_b: number;
    price_per_km_c: number;
    price_per_km_d: number;
    price_per_km_e: number;
    price_per_km_f: number;
    price_per_km_g: number;
    price_per_km_h: number;
    price_per_km_i: number;
    price_per_km_j: number;
    price_per_km_k: number;
    price_per_km_l: number;
    price_per_km_m: number;
    price_per_km_n: number;
    price_per_km_o: number;
    price_per_km_p: number;
    price_per_km_q: number;
    price_per_km_r: number;
    price_per_km_s: number;
    price_per_km_t: number;
    price_per_km_u: number;
    price_per_km_v: number;
    price_per_km_w: number;
    price_per_km_y: number;
    cost_per_stop_inside_city: number;
    cost_per_stop_outside_city: number;
    cost_per_helper: number;
    cost_travel_insurance: number;
    fixed_fees: number;
    model_type: number;
    free_stops: number;
    zone_ids: import("mongoose").Types.ObjectId[];
    night_shift: number;
    boat_ticket: number;
    countryid?: import("mongoose").Types.ObjectId;
    user_type_id?: import("mongoose").Types.ObjectId;
    cityid?: import("mongoose").Types.ObjectId;
    city_id?: import("mongoose").Types.ObjectId;
    typeid?: import("mongoose").Types.ObjectId;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    created_at: Date;
    updated_at: Date;
    countryname: string;
    user_type: number;
    is_ride_share: number;
    is_hide: number;
    surge_multiplier: number;
    surge_start_hour: number;
    surge_end_hour: number;
    is_surge_hours: number;
    is_zone: number;
    rich_area_surge: any[];
    surge_hours: any[];
    is_business: number;
    cityname: string;
    type_image: string;
    min_fare: number;
    provider_profit: number;
    typename: string;
    is_car_rental_business: number;
    car_rental_ids: import("mongoose").Types.ObjectId[];
    base_price_distance: number;
    base_price_time: number;
    base_price: number;
    price_per_unit_distance: number;
    price_for_total_time: number;
    waiting_time_start_after_minute: number;
    price_for_waiting_time: number;
    waiting_time_start_after_minute_multiple_stops: number;
    price_for_waiting_time_multiple_stops: number;
    tax: number;
    max_space: number;
    cancellation_fee: number;
    user_miscellaneous_fee: number;
    provider_miscellaneous_fee: number;
    user_tax: number;
    provider_tax: number;
    model_pricing_ids: import("mongoose").Types.ObjectId[];
    modelid: any[];
    serviceid: any[];
    capacityid: any[];
    price_per_km_a: number;
    price_per_km_b: number;
    price_per_km_c: number;
    price_per_km_d: number;
    price_per_km_e: number;
    price_per_km_f: number;
    price_per_km_g: number;
    price_per_km_h: number;
    price_per_km_i: number;
    price_per_km_j: number;
    price_per_km_k: number;
    price_per_km_l: number;
    price_per_km_m: number;
    price_per_km_n: number;
    price_per_km_o: number;
    price_per_km_p: number;
    price_per_km_q: number;
    price_per_km_r: number;
    price_per_km_s: number;
    price_per_km_t: number;
    price_per_km_u: number;
    price_per_km_v: number;
    price_per_km_w: number;
    price_per_km_y: number;
    cost_per_stop_inside_city: number;
    cost_per_stop_outside_city: number;
    cost_per_helper: number;
    cost_travel_insurance: number;
    fixed_fees: number;
    model_type: number;
    free_stops: number;
    zone_ids: import("mongoose").Types.ObjectId[];
    night_shift: number;
    boat_ticket: number;
    countryid?: import("mongoose").Types.ObjectId;
    user_type_id?: import("mongoose").Types.ObjectId;
    cityid?: import("mongoose").Types.ObjectId;
    city_id?: import("mongoose").Types.ObjectId;
    typeid?: import("mongoose").Types.ObjectId;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    created_at: Date;
    updated_at: Date;
    countryname: string;
    user_type: number;
    is_ride_share: number;
    is_hide: number;
    surge_multiplier: number;
    surge_start_hour: number;
    surge_end_hour: number;
    is_surge_hours: number;
    is_zone: number;
    rich_area_surge: any[];
    surge_hours: any[];
    is_business: number;
    cityname: string;
    type_image: string;
    min_fare: number;
    provider_profit: number;
    typename: string;
    is_car_rental_business: number;
    car_rental_ids: import("mongoose").Types.ObjectId[];
    base_price_distance: number;
    base_price_time: number;
    base_price: number;
    price_per_unit_distance: number;
    price_for_total_time: number;
    waiting_time_start_after_minute: number;
    price_for_waiting_time: number;
    waiting_time_start_after_minute_multiple_stops: number;
    price_for_waiting_time_multiple_stops: number;
    tax: number;
    max_space: number;
    cancellation_fee: number;
    user_miscellaneous_fee: number;
    provider_miscellaneous_fee: number;
    user_tax: number;
    provider_tax: number;
    model_pricing_ids: import("mongoose").Types.ObjectId[];
    modelid: any[];
    serviceid: any[];
    capacityid: any[];
    price_per_km_a: number;
    price_per_km_b: number;
    price_per_km_c: number;
    price_per_km_d: number;
    price_per_km_e: number;
    price_per_km_f: number;
    price_per_km_g: number;
    price_per_km_h: number;
    price_per_km_i: number;
    price_per_km_j: number;
    price_per_km_k: number;
    price_per_km_l: number;
    price_per_km_m: number;
    price_per_km_n: number;
    price_per_km_o: number;
    price_per_km_p: number;
    price_per_km_q: number;
    price_per_km_r: number;
    price_per_km_s: number;
    price_per_km_t: number;
    price_per_km_u: number;
    price_per_km_v: number;
    price_per_km_w: number;
    price_per_km_y: number;
    cost_per_stop_inside_city: number;
    cost_per_stop_outside_city: number;
    cost_per_helper: number;
    cost_travel_insurance: number;
    fixed_fees: number;
    model_type: number;
    free_stops: number;
    zone_ids: import("mongoose").Types.ObjectId[];
    night_shift: number;
    boat_ticket: number;
    countryid?: import("mongoose").Types.ObjectId;
    user_type_id?: import("mongoose").Types.ObjectId;
    cityid?: import("mongoose").Types.ObjectId;
    city_id?: import("mongoose").Types.ObjectId;
    typeid?: import("mongoose").Types.ObjectId;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const CityTypeModel: import("mongoose").Model<CityTypeDocument, {}, {}, {}, Document<unknown, {}, CityTypeDocument> & CityTypeDocument & Required<{
    _id: unknown;
}>, any>;
