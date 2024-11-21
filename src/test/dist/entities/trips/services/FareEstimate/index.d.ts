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
import { CityTypeDocument } from 'src/db/schemas/CityType.schema';
import { CityDocument } from 'src/db/schemas/City.schema';
import { PromoCodeDocument } from 'src/db/schemas/PromoCode.schema';
import { CitytypeZoneService } from 'src/entities/citytype/services/CitytypeZoneService';
import { TariffService } from '../Tariff';
export declare class FareEstimate {
    private readonly cityTypeModel;
    private readonly cityModel;
    private readonly promoCodeModel;
    private readonly tariffService;
    private readonly citytypeZoneService;
    private handlerQuery;
    constructor(cityTypeModel: Model<CityTypeDocument>, cityModel: Model<CityDocument>, promoCodeModel: Model<PromoCodeDocument>, tariffService: TariffService, citytypeZoneService: CitytypeZoneService);
    getFareEstimate(params: any, res: any): Promise<any>;
    getModelsPricingType({ selected_model_id, selected_service_id, selected_capacity_id, citytype, }: {
        selected_model_id: any;
        selected_service_id: any;
        selected_capacity_id: any;
        citytype: any;
    }): Promise<any>;
    calculateCityWisePricing(body: any, { modelPricingType, originCoordinates, destinationCoordinates, citytype }: {
        modelPricingType: any;
        originCoordinates: any;
        destinationCoordinates: any;
        citytype: any;
    }): Promise<any>;
    handleZoneFareCalculation({ city, cityId, citytype, originCoordinates, destinationCoordinates, distanceKmMile, unit, cancellationFees, }: {
        city: any;
        cityId: any;
        citytype: any;
        originCoordinates: any;
        destinationCoordinates: any;
        distanceKmMile: any;
        unit: any;
        cancellationFees: any;
    }): Promise<{
        status: boolean;
        message?: undefined;
        trip_type?: undefined;
        distance?: undefined;
        estimated_fare?: undefined;
        unit_set?: undefined;
        cancellation_fees?: undefined;
    } | {
        status: boolean;
        message: string;
        trip_type: string;
        distance: any;
        estimated_fare: number;
        unit_set: any;
        cancellation_fees: any;
    }>;
    handleCourierFlowType(body: any, specs: any): Promise<{
        isFixedFeesUsed: number;
        modelPricingType: any;
        priceDistance: any;
        pricePerUnitDistance: any;
        distanceFixed: number;
        isMinFareUsed: number;
    } | {
        isFixedFeesUsed: number;
        modelPricingType: any;
        priceDistance: number;
        pricePerUnitDistance: any;
        distanceFixed: any;
        isMinFareUsed: number;
    }>;
    fixedFeesFlow(body: any, specs: any): Promise<{
        isFixedFeesUsed: number;
        modelPricingType: any;
        priceDistance: any;
        pricePerUnitDistance: any;
        distanceFixed: number;
        isMinFareUsed: number;
    }>;
    handleFeesCalculationFlow(specs: any): Promise<{
        isFixedFeesUsed: number;
        modelPricingType: any;
        priceDistance: number;
        pricePerUnitDistance: any;
        distanceFixed: any;
        isMinFareUsed: number;
    }>;
    calculateFee({ priceDistance, insideStopsPrice, outsideStopsPrice, nightShift, boatTicket, citytype, modelPricingType, isMinFareUsed, costTravelInsurance, helpersPrice, }: {
        priceDistance: any;
        insideStopsPrice: any;
        outsideStopsPrice: any;
        nightShift: any;
        boatTicket: any;
        citytype: any;
        modelPricingType: any;
        isMinFareUsed: any;
        costTravelInsurance: any;
        helpersPrice: any;
    }): Promise<{
        total: number;
        isMinFareUsed: any;
    }>;
    checkMargaritaZone(specs: any): Promise<{
        isMargarita: boolean;
        nightShiftCount: any;
        boatTicket: number;
    }>;
}
