import { HttpStatus } from '@nestjs/common';
interface IValidateClient {
    id: string;
    token: string;
    clientType: string;
}
export declare class CitytypeValidationService {
    private clientTypeSpecs;
    validateClient({ id, token, clientType }: IValidateClient): Promise<{
        status: boolean;
        response: {
            status: HttpStatus;
            message: string;
        };
        data?: undefined;
        userType?: undefined;
    } | {
        status: boolean;
        data: any;
        userType: any;
        response?: undefined;
    }>;
}
export {};
