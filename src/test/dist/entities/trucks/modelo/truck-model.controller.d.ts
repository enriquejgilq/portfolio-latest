import { TruckModelService } from './truck-model.service';
import { CreateTruckModelDto } from './create-truck-model.dto';
import { TruckModel } from '../../../db/schemas/TruckModel.schema';
export declare class TruckModelController {
    private readonly truckModelService;
    constructor(truckModelService: TruckModelService);
    createTruckModel(createTruckModelDto: CreateTruckModelDto): Promise<TruckModel>;
    getModelsByBrand(brandId: string): Promise<any[]>;
}
