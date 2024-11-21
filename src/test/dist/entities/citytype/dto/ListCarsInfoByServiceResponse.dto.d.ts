declare class ServiceDTO {
    _id: string;
    service_name: string;
}
export declare class ListCarsInfoByServiceResponseDTO {
    status: boolean;
    data: ServiceDTO[];
}
export {};
