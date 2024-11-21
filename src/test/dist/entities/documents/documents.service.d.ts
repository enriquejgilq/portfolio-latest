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
import { DocumentDocument } from 'src/db/schemas/Document.schema';
import { CountryDocument } from 'src/db/schemas/Country.schema';
import { IValuesRequest, IValuesResponse, IPage, IPageResponse } from './interfaces';
export declare class DocumentsService {
    private readonly documentModel;
    private readonly countryModel;
    private valuesDefault;
    specsQuery: {
        lookup: {
            $lookup: {
                from: string;
                localField: string;
                foreignField: string;
                as: string;
            };
        };
        unwind: {
            $unwind: string;
        };
        group: {
            $group: {
                _id: any;
                total: {
                    $sum: number;
                };
                data: {
                    $push: string;
                };
            };
        };
    };
    constructor(documentModel: Model<DocumentDocument>, countryModel: Model<CountryDocument>);
    setValuesDefault(values: IValuesRequest): IValuesResponse;
    setPage({ page }: IPage): IPageResponse;
    getDocuments(params: any, res: any): Promise<any>;
    generateDocumentExcel(params: any, res: any): Promise<any>;
    addDocumentForm(params: any, res: any): Promise<any>;
    addDocumentDetails(params: any, res: any): Promise<any>;
    editDocumentForm(params: any, res: any): Promise<any>;
    updateDocumentDetail(params: any, res: any): Promise<any>;
    findDocumentByCountry(params: any, res: any): Promise<any>;
}
