/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericResponse } from 'src/models/generic-response.model';
import { NaturalRifOcrDto } from './dto/onboarding/natural-user/s3key.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto, profilePicture: Express.Multer.File): Promise<import("../../db/schemas/UserP.schema").User>;
    naturalRifOcr(naturalRifOcrDto: NaturalRifOcrDto): Promise<GenericResponse>;
    naturalDniOcr(naturalRifOcrDto: NaturalRifOcrDto): Promise<GenericResponse>;
    uploadProfilePicture(picture: Express.Multer.File): Promise<{
        pictureUrl: string;
    }>;
    uploadDni(dni: Express.Multer.File): Promise<{
        dniUrl: string;
    }>;
    updateMercantileRegistry(userId: string, file: Express.Multer.File): Promise<import("../../db/schemas/UserP.schema").User>;
    uploadRif(rif: Express.Multer.File): Promise<{
        rifUrl: string;
    }>;
    registerDocuments(userId: string, userType: boolean, body: {
        pictureUrl: string;
        dniUrl: string;
        rifUrl: string;
        dniRegister: {
            names: string;
            expedition: string;
            expiration: string;
            surnames: string;
            dniNumber: string;
        };
        rifRegister: {
            rifNumberAndNames: string;
            registrationDate: string;
            dueDate: string;
            fiscalAddress: string;
        };
    }): Promise<import("../../db/schemas/UserP.schema").User>;
    getUser(id: string): Promise<import("../../db/schemas/UserP.schema").User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<import("../../db/schemas/UserP.schema").User>;
    deleteUser(id: string): Promise<import("../../db/schemas/UserP.schema").User>;
    updateUserSettings(userId: string, updateUserSettingsDto: UpdateUserDto): Promise<import("../../db/schemas/UserP.schema").User>;
}
