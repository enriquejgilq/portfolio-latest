/// <reference types="node" />
export declare class OCRService {
    OcrImage(fileBuffer: Buffer, rif: boolean): Promise<{}>;
    private processTextractResponse;
    getText(result: any, blocksMap: any): string;
    findValueBlock(keyBlock: any, valueMap: any): any;
    getKeyValueRelationship(keyMap: any, valueMap: any, blockMap: any): {};
    getKeyValueMap(blocks: any): {
        keyMap: {};
        valueMap: {};
        blockMap: {};
    };
}
