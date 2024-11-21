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
import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CountryDocument } from 'src/db/schemas/Country.schema';
import { CityDocument } from 'src/db/schemas/City.schema';
interface ILocation {
    currentLocation: number[];
}
interface ILocationData extends ILocation {
    country: string;
    countryCode: string;
}
interface INearbyCityDetails extends ILocation {
    countryData: CountryDocument;
}
interface INNearestCity extends ILocation {
    citiesData: CityDocument[];
}
export declare class CitytypeLocationService {
    private readonly countryModel;
    private readonly cityModel;
    constructor(countryModel: Model<CountryDocument>, cityModel: Model<CityDocument>);
    getLocationData({ country, currentLocation, countryCode, }: ILocationData): Promise<{
        status: boolean;
        response: {
            status: HttpStatus;
            message: string;
            error_code: string;
        };
        nearbyCityDetails?: undefined;
    } | {
        status: boolean;
        nearbyCityDetails: {
            finalCityId: any;
            finalCityDetails: {};
        };
        response?: undefined;
    }>;
    getNearByCities(specs: INearbyCityDetails): Promise<{
        status: boolean;
        data: (import("mongoose").FlattenMaps<CityDocument> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }>)[];
    } | {
        status: boolean;
        data?: undefined;
    }>;
    findNearestCity({ citiesData, currentLocation }: INNearestCity): {
        finalCityId: any;
        finalCityDetails: {};
    };
}
export {};
