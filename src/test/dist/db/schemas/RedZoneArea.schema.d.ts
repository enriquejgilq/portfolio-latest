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
export interface RedZoneAreaDocument extends Document {
    cityid: Schema.Types.ObjectId;
    title: string;
    styleUrl: string;
    styleHash: string;
    description: string;
    stroke: string;
    stroke_opacity: number;
    stroke_width: number;
    fill: string;
    fill_opacity: number;
    kmlzone: any[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const RedZoneAreaSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
    collection: string;
}, {
    title: string;
    fill: string;
    description: string;
    cityid: import("mongoose").Types.ObjectId;
    styleUrl: string;
    styleHash: string;
    stroke: string;
    stroke_opacity: number;
    stroke_width: number;
    fill_opacity: number;
    kmlzone: any[];
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    title: string;
    fill: string;
    description: string;
    cityid: import("mongoose").Types.ObjectId;
    styleUrl: string;
    styleHash: string;
    stroke: string;
    stroke_opacity: number;
    stroke_width: number;
    fill_opacity: number;
    kmlzone: any[];
}>> & import("mongoose").FlatRecord<{
    title: string;
    fill: string;
    description: string;
    cityid: import("mongoose").Types.ObjectId;
    styleUrl: string;
    styleHash: string;
    stroke: string;
    stroke_opacity: number;
    stroke_width: number;
    fill_opacity: number;
    kmlzone: any[];
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const RedZoneAreaModel: import("mongoose").Model<RedZoneAreaDocument, {}, {}, {}, Document<unknown, {}, RedZoneAreaDocument> & RedZoneAreaDocument & Required<{
    _id: unknown;
}>, any>;
