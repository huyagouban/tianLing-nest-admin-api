declare interface Buffer extends ArrayBuffer {
}
export declare class DownloadExcelService {
    exportDataToExcel(data: any[], sheetName: string, header: string[], fileName: string): Promise<Buffer>;
    importExcel(filePath: string): Promise<any[][]>;
}
export {};
