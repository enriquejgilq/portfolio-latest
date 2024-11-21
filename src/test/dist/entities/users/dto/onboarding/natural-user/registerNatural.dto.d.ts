declare class DniRegisterDto {
    names: string;
    expedition: string;
    expiration: string;
    surnames: string;
    dniNumber: string;
}
declare class RifRegisterDto {
    rifNumberAndNames: string;
    registrationDate: string;
    dueDate: string;
    fiscalAddress: string;
}
export declare class UploadDocumentsResponseDto {
    pictureUrl: string;
    dniUrl: string;
    rifUrl: string;
    dniRegister: DniRegisterDto;
    rifRegister: RifRegisterDto;
    type: boolean;
}
export {};
