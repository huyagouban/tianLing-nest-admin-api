"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadExcelService = void 0;
const common_1 = require("@nestjs/common");
const exceljs_1 = require("exceljs");
let DownloadExcelService = class DownloadExcelService {
    async exportDataToExcel(data, sheetName = 'Sheet1', header, fileName) {
        const workbook = new exceljs_1.Workbook();
        let worksheet;
        if (workbook.worksheets.length > 0) {
            worksheet = workbook.getWorksheet(sheetName) || workbook.addWorksheet(sheetName);
        }
        else {
            worksheet = workbook.addWorksheet(sheetName);
        }
        worksheet.addRow(header);
        if (data.length > 0) {
            worksheet.addRows(data);
        }
        const excelBuffer = await workbook.xlsx.writeBuffer();
        return excelBuffer;
    }
    async importExcel(filePath) {
        try {
            const workbook = new exceljs_1.Workbook();
            await workbook.xlsx.readFile(filePath);
            const worksheet = workbook.worksheets[0];
            const data = [];
            worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                if (rowNumber === 1)
                    return;
                const rowData = [];
                row.eachCell((cell) => {
                    rowData.push(cell.value);
                });
                data.push(rowData);
            });
            return data;
        }
        catch (error) {
            console.error('Error importing Excel:', error);
            throw error;
        }
    }
};
exports.DownloadExcelService = DownloadExcelService;
exports.DownloadExcelService = DownloadExcelService = __decorate([
    (0, common_1.Injectable)()
], DownloadExcelService);
//# sourceMappingURL=ExcelService.utils.js.map