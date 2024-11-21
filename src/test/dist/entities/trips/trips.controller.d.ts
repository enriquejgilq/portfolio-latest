import { FareEstimate } from './services/FareEstimate';
export declare class TripsController {
    private readonly fareEstimateService;
    constructor(fareEstimateService: FareEstimate);
    getFareEstimate(req: any, res: any, session: any): Promise<any>;
}
