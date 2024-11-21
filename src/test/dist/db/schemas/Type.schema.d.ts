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
export interface TypeDocument extends Document {
    typename: string;
    typename2: string;
    description: string;
    typeImageUrl: string;
    mapPinImageUrl: string;
    panelMapPinImageUrl: string;
    serviceType: number;
    priority: number;
    isBusiness: number;
    isDefaultSelected: boolean;
    rideShareLimit: number;
    typeModelList: Schema.Types.ObjectId[];
    typeServiceList: Schema.Types.ObjectId[];
    typeCapacityList: Schema.Types.ObjectId[];
    isUseModel: number;
    sequence: string;
    isUseCapacity: number;
    isUseServices: number;
    isUseSpecification: number;
    modelType?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const TypeSchema: Schema<TypeDocument, import("mongoose").Model<TypeDocument, any, any, any, Document<unknown, any, TypeDocument> & TypeDocument & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TypeDocument, Document<unknown, {}, import("mongoose").FlatRecord<TypeDocument>> & import("mongoose").FlatRecord<TypeDocument> & Required<{
    _id: unknown;
}>>;
export declare const TypeModel: import("mongoose").Model<TypeDocument, {}, {}, {}, Document<unknown, {}, TypeDocument> & TypeDocument & Required<{
    _id: unknown;
}>, any>;
