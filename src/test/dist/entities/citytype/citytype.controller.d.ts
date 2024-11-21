import { CitytypeService } from './citytype.service';
import { ModelsService } from './services/models';
import { OptionRequestDto } from './dto/OptionsRequest.dto';
import { OptionResponseDto } from './dto/OptionResponse.dto';
import { ListCarsInfoByServiceRequestDTO } from './dto/LstCarsInfoByServiceRequest.dto';
import { ListModelsCarsRequestDto } from './dto/ListModelsCarsRequest.dto';
export declare class CitytypeController {
    private readonly citytypeService;
    private readonly modelsService;
    private allowedCountries;
    private clientType;
    constructor(citytypeService: CitytypeService, modelsService: ModelsService);
    listServicesOptions(req: any, res: any, body: OptionRequestDto, session: any): Promise<OptionResponseDto>;
    listServicesByType(res: any, session: Record<string, any>): Promise<Response>;
    listCarsInfoByservice(body: ListCarsInfoByServiceRequestDTO, res: any, session: any): Promise<any>;
    listModelsCars(body: ListModelsCarsRequestDto, res: any, session: Record<string, any>): Promise<any>;
}
