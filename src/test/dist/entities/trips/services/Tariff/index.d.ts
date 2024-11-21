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
import { Connection } from 'mongoose';
interface PricingRange {
    min: number;
    max: number;
    priceKey: string;
    baseDistance?: number;
    range?: number;
    fixedRange?: boolean;
}
export declare class TariffService {
    private connection;
    private MAX_DISTANCE_FOR_FIXED_PRICE;
    constructor(connection: Connection);
    processRanges(pricingRanges: PricingRange[], gandolaRanges: PricingRange[], { distanceKmMile, modelPricingType }: {
        distanceKmMile: any;
        modelPricingType: any;
    }): PricingRange;
    calculate({ distanceKmMile, modelPricingType }: {
        distanceKmMile: any;
        modelPricingType: any;
    }): {
        pricePerUnitDistance: any;
        range: number;
    };
    recalculate({ previousTotal, modelPricingType, distance }: {
        previousTotal: any;
        modelPricingType: any;
        distance: any;
    }): {
        pricePerUnit: any;
        price: number;
        fixed: boolean;
        distanceFixed: any;
    };
    recalculateRange({ distance, modelPricingType }: {
        distance: any;
        modelPricingType: any;
    }): {
        pricePerUnitDistance: any;
        distanceKmMile: any;
        fixedRange: boolean;
    };
    validateLocation(coordinates: [number, number], stateNumber: number): Promise<boolean>;
}
export {};
