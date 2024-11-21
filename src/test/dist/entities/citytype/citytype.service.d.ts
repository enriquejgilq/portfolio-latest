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
import { Model, PipelineStage } from 'mongoose';
import { CityTypeDocument } from 'src/db/schemas/CityType.schema';
import { CitytypeValidationService } from './services/CitytypeValidationService';
import { CitytypeLocationService } from './services/CitytypeLocationService';
import { CitytypeZoneService } from './services/CitytypeZoneService';
import { TypesService } from './services/types';
import { CitytypeOptionsParams, BuildCityTypePipelineParams } from './interfaces';
import { OptionResponseDto } from './dto/OptionResponse.dto';
export declare class CitytypeService {
    private readonly cityTypeModel;
    private readonly citytypeValidationService;
    private readonly citytypeLocationService;
    private readonly citytypeZoneService;
    private readonly typesService;
    private lookupsQuery;
    private unwindQuery;
    constructor(cityTypeModel: Model<CityTypeDocument>, citytypeValidationService: CitytypeValidationService, citytypeLocationService: CitytypeLocationService, citytypeZoneService: CitytypeZoneService, typesService: TypesService);
    getCitytypeOptions(params: CitytypeOptionsParams, res: any): Promise<OptionResponseDto>;
    buildCityTypePipeline({ finalCityDetails, finalCityId, clientData, userType, }: BuildCityTypePipelineParams): PipelineStage[];
    processCityTypes({ cityTypesData, cityZoneInside }: {
        cityTypesData: any;
        cityZoneInside: any;
    }): void;
    getCarsInfoByService(params: CitytypeOptionsParams, res: any): Promise<any>;
    getServicesbyType(params: {
        session: Record<string, any>;
    }, res: any): Promise<Response>;
}
