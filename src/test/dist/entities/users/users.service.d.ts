/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
/// <reference types="mongoose-paginate-v2" />
import { User, UserDocument } from 'src/db/schemas/UserP.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { OCRService } from 'src/services/ocr/ocr.service';
import { GenericResponse } from 'src/models/generic-response.model';
export declare class UsersService {
    private readonly userModel;
    private readonly ocrService;
    constructor(userModel: Model<UserDocument>, ocrService: OCRService);
    create(createUserDto: CreateUserDto): Promise<User>;
    naturalRifOcr(s3Key: string): Promise<GenericResponse>;
    naturalDniOcr(s3Key: string): Promise<GenericResponse>;
    uploadFileToS3(file: Express.Multer.File, folder: string, fileName: string): Promise<string>;
    updateUserWithDocuments(userId: string, userType: boolean, pictureUrl: string, dniUrl: string, rifUrl: string, dniRegister: {
        names: string;
        expedition: string;
        expiration: string;
        surnames: string;
        dniNumber: string;
    }, rifRegister: {
        rifNumberAndNames: string;
        registrationDate: string;
        dueDate: string;
        fiscalAddress: string;
    }): Promise<User>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
    updateProfilePicture(userId: string, file: Express.Multer.File): Promise<User>;
    updateUserWithMercantileRegistry(userId: string, mercantileRegistryUrl: string): Promise<User>;
    updateUserSettings(userId: string, updateUserSettingsDto: UpdateUserDto): Promise<User>;
}
