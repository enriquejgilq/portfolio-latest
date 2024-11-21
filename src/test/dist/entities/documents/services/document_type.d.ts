declare class DocumentType {
    private specsType;
    processDocumentsDataByType({ type, filter, document }: {
        type: any;
        filter: any;
        document: any;
    }): Promise<{
        status: boolean;
        msg: string;
    } | {
        status: boolean;
        msg?: undefined;
    }>;
    processDocumentPartnerVehicle({ obj, vehicleDetail }: {
        obj: any;
        vehicleDetail: any;
    }): any;
    getExcelHeaderByType({ type }: {
        type: any;
    }): string;
    getDocumentAndUpdateById({ id, type, specs }: {
        id: any;
        type: any;
        specs: any;
    }): Promise<{
        status: boolean;
        msg: string;
    } | {
        status: true;
        msg?: undefined;
    }>;
}
export declare const documentTypeService: DocumentType;
export {};
