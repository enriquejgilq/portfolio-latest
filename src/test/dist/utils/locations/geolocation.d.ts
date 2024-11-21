interface IPoint {
    latitude: number;
    longitude: number;
}
declare class Geolocation {
    isPointInsidePolygon(point: any, polygon: any): boolean;
    findZoneByPoint(listData: any, point: IPoint): any;
}
export declare const geolocation: Geolocation;
export {};
