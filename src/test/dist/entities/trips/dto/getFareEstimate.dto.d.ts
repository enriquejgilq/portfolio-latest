export declare class FareEstimateDto {
    service_type_id: string;
    pickup_latitude: number;
    pickup_longitude: number;
    destination_latitude: number;
    destination_longitude: number;
    distance: number;
    optimize?: boolean;
    number_of_helpers_load?: number;
    number_of_helpers_download?: number;
    night_shift?: number;
    boat_ticket_check?: number;
    promo_id?: string;
}
