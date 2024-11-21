"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelHandler = void 0;
const exceljs_1 = require("exceljs");
const fs = require("fs");
class ExcelHandler {
    constructor() {
        this.sheets = {};
        this.workbook = new exceljs_1.Workbook();
    }
    addSheet(sheetName, options = {}) {
        this.sheets[sheetName] = this.workbook.addWorksheet(sheetName, options);
        return this.sheets[sheetName];
    }
    addHeaderCells(sheetName, values) {
        values.forEach((value, index) => {
            this.sheets[sheetName].getRow(1).getCell(index + 1).value = value;
        });
    }
    async save(filePath) {
        const dirPath = filePath.split('/').slice(0, -1).join('/');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        await this.workbook.xlsx.writeFile(filePath);
    }
}
exports.ExcelHandler = ExcelHandler;
//# sourceMappingURL=excel.js.map