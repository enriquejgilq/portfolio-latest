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
import { Model } from 'mongoose';
import { RedZoneAreaDocument } from 'src/db/schemas/RedZoneArea.schema';
import { CityZoneDocument } from 'src/db/schemas/CityZone.schema';
import { ZoneValueDocument } from 'src/db/schemas/ZoneValue.schema';
interface ILocation {
    currentLocation: number[];
}
interface ICheckZones extends ILocation {
    cityId: string;
    modelName: string;
}
interface ICheckZone extends ILocation {
    model: Model<any>;
    cityId: string;
}
export declare class CitytypeZoneService {
    private readonly redZoneAreaModel;
    private readonly cityZoneModel;
    private readonly zoneValueModel;
    constructor(redZoneAreaModel: Model<RedZoneAreaDocument>, cityZoneModel: Model<CityZoneDocument>, zoneValueModel: Model<ZoneValueDocument>);
    checkZones({ cityId, currentLocation, modelName }: ICheckZones): Promise<{
        zoneInside: any;
    }>;
    checkZone({ model, cityId, currentLocation }: ICheckZone): Promise<{
        isInside: any;
        status: boolean;
    } | {
        status: boolean;
        isInside?: undefined;
    }>;
    getValueFromTwoZones({ serviceTypeId, zoneOriginId, zoneDestinationId, }: {
        serviceTypeId: any;
        zoneOriginId: any;
        zoneDestinationId: any;
    }): Promise<{
        zoneValue: import("mongoose").FlattenMaps<ZoneValueDocument> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }>;
    }>;
}
export {};
