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
export interface CityZoneDocument extends Document {
    cityid: Schema.Types.ObjectId;
    title: string;
    cityname: string;
    styleUrl: string;
    styleHash: string;
    description: string;
    stroke: string;
    stroke_opacity: number;
    stroke_width: number;
    fill: string;
    fill_opacity: number;
    total_provider_in_zone_queue: Schema.Types.ObjectId[];
    kmlzone: any;
    created_at: Date;
    updated_at: Date;
}
export declare const CityZoneSchema: Schema<CityZoneDocument, import("mongoose").Model<CityZoneDocument, any, any, any, Document<unknown, any, CityZoneDocument> & CityZoneDocument & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CityZoneDocument, Document<unknown, {}, import("mongoose").FlatRecord<CityZoneDocument>> & import("mongoose").FlatRecord<CityZoneDocument> & Required<{
    _id: unknown;
}>>;
export declare const CityZoneModel: import("mongoose").Model<CityZoneDocument, {}, {}, {}, Document<unknown, {}, CityZoneDocument> & CityZoneDocument & Required<{
    _id: unknown;
}>, any>;
