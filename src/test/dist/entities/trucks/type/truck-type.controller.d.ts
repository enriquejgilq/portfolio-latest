import { TruckTypeService } from './truck-type.service';
import { CreateTruckTypeDto } from './create-truck-type.dto';
import { TruckType } from '../../../db/schemas/TruckType.schema';
export declare class TruckTypeController {
    private readonly truckTypeService;
    constructor(truckTypeService: TruckTypeService);
    createTruckType(createTruckTypeDto: CreateTruckTypeDto): Promise<TruckType>;
    getAllTruckTypes(): Promise<TruckType[]>;
}
