declare enum TireCondition {
    TWENTY = "20%",
    FIFTY = "50%",
    EIGHTY_OR_MORE = "80% or more"
}
declare class DimensionDto {
    lengthCava: number;
    width: number;
    heightCava: number;
    lengthPlatform: number;
    heightPlatform: number;
    cubicMeters: number;
}
declare class VehicleStateDto {
    tires: TireCondition;
    windshield: boolean;
    mirrors: boolean;
    frontLights: boolean;
    rearLights: boolean;
    brakeLights: boolean;
    signalLights: boolean;
    holesInCava: boolean;
    doors: boolean;
}
declare class VehicleAccessoriesDto {
    extinguisher: boolean;
    hydraulicJack: boolean;
    Pussy: boolean;
    padlock: boolean;
    rubberKey: boolean;
    spareRubber: boolean;
    toolBox: boolean;
    waxed: boolean;
    chacas: boolean;
    ropes: boolean;
    chains: boolean;
    cinchas: boolean;
}
export declare class CreateTruckDto {
    readonly name: string;
    readonly typeId: string;
    readonly brandId: string;
    readonly modelId: string;
    readonly plate: string;
    readonly temperature: number;
    readonly capacityPallets: number;
    readonly capacityKilos: number;
    createdBy?: string;
    readonly dimensions: DimensionDto[];
    readonly vehicleState: VehicleStateDto[];
    readonly vehicleAccessories: VehicleAccessoriesDto[];
}
export {};
