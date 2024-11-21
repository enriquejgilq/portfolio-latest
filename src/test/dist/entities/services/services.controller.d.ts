import { ServicesService } from './services.service';
import { ResponseServiceDto } from './dto/ResponseService.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    list(res: any, session: any): Promise<ResponseServiceDto>;
}
