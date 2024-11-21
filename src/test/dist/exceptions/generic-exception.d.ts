export declare class GenericException extends Error {
    status: number;
    message: string;
    constructor(message: string, status: number);
}
