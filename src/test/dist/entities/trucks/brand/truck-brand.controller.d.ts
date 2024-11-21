import { TruckBrandService } from './truck-brand.service';
import { CreateTruckBrandDto } from './create-truck-brand.dto';
import { TruckBrand } from '../../../db/schemas/TruckBrand.schema';
export declare class TruckBrandController {
    private readonly truckBrandService;
    constructor(truckBrandService: TruckBrandService);
    createTruckBrand(createTruckBrandDto: CreateTruckBrandDto): Promise<TruckBrand>;
    getBrandsByTruckType(typeId: string): Promise<any[]>;
}
