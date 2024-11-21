export declare class ExcelHandler {
    private workbook;
    private sheets;
    constructor();
    addSheet(sheetName: string, options?: any): any;
    addHeaderCells(sheetName: string, values: any): void;
    save(filePath: string): Promise<void>;
}
