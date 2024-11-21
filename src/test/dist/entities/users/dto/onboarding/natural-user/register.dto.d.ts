/// <reference types="multer" />
import { DNIRegister } from './dni-register.dto';
import { RIFRegister } from './rif-register.dto';
export declare class RegisterDto {
    readonly dniRegister: DNIRegister;
    readonly rifRegister: RIFRegister;
    picture: Express.Multer.File;
    rif: Express.Multer.File;
    dni: Express.Multer.File;
    type: string;
    mercantileRegistry?: Express.Multer.File;
}
