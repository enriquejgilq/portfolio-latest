declare class CalculateDistance {
    private radius;
    haversineDistance(params: any): number;
    getRouteMapInfo({ origin, destination, stops, optimize }: {
        origin: any;
        destination: any;
        stops: any;
        optimize: any;
    }): Promise<{
        distance: any;
        reorder: any;
        legs: any;
    }>;
}
export declare const calculateDistance: CalculateDistance;
export {};
