import { PricingrulesService } from './pricingrules.service';
export declare class PricingrulesController {
    private readonly pricingrulesService;
    constructor(pricingrulesService: PricingrulesService);
    getRules(res: any): Promise<any>;
}
