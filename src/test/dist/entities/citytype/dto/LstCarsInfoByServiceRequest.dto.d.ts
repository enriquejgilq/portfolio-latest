export declare enum AllowedCountries {
    USA = "USA",
    CAN = "CAN"
}
export declare class ListCarsInfoByServiceRequestDTO {
    token: string;
    country: AllowedCountries;
    clientTypeData?: string;
    latitude: number;
    longitude: number;
}
