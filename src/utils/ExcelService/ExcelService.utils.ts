import { Injectable } from '@nestjs/common';
import { Workbook, Worksheet } from 'exceljs'; // 确保已经安装 exceljs 库

declare interface Buffer extends ArrayBuffer { }

interface headerData {
    key: string;
    value: string;
}
/**
 * 封装用于将数据导出到Excel的通用服务。
 */
@Injectable()
export class DownloadExcelService {
    /**
     * 导出数据到Excel文件。
     * 
     * @param data - 要导出的数据数组，格式为[['1', '2']]。
     * @param sheetName - 工作表的名称，默认为 'Sheet1'。
     * @param header - 表头数组，定义每列的标题，格式为为 ['id','name']。
     * @param fileName - 导出文件的名称（不含扩展名）。
     * @returns Excel文件的Buffer。
     */
    async exportDataToExcel(
        data: any[],
        sheetName: string = 'Sheet1',
        header: string[],
        fileName: string
    ): Promise<Buffer> {
        // 创建工作簿
        const workbook = new Workbook();

        // 添加或获取工作表
        let worksheet: Worksheet;
        if (workbook.worksheets.length > 0) {
            worksheet = workbook.getWorksheet(sheetName) || workbook.addWorksheet(sheetName);
        } else {
            worksheet = workbook.addWorksheet(sheetName);
        }

        // 添加标题行
        worksheet.addRow(header);
        // 添加数据行
        if (data.length > 0) {
            worksheet.addRows(data);
        }

        // 定义导出的格式
        const excelBuffer = await workbook.xlsx.writeBuffer();

        return excelBuffer;
    }
    /**
     * 
     * @param filePath 导入文件的链接
     * @returns 导入excel文件的数据
     */
    async importExcel(filePath: string): Promise<any[][]> {
        try {
            // 读取Excel文件
            const workbook = new Workbook();
            await workbook.xlsx.readFile(filePath);

            // 假设我们处理第一个工作表
            const worksheet = workbook.worksheets[0];
            const data: any[][] = [];

            worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                if (rowNumber === 1) return; // 跳过表头
                const rowData: any[] = [];
                row.eachCell((cell) => {
                    rowData.push(cell.value);
                });
                data.push(rowData);
            });

            return data;
        } catch (error) {
            console.error('Error importing Excel:', error);
            throw error;
        }
    }
}