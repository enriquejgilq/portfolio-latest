export declare class OptionRequestDto {
    token: string;
    country: string;
    country_code?: string;
    latitude: number;
    longitude: number;
    clientType: 'clientTypeA' | 'clientTypeB';
    services?: string[];
}
