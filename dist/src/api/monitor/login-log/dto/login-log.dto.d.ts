import { PagesDto } from "src/common/public/base-pages-entity";
import { LoginLog } from "src/api/monitor/login-log/entities/login-log.entity";
export declare class ListLoginLogDto extends PagesDto {
    loginName?: string;
    loginStatus?: string;
    createTime?: string[];
}
declare const CreateLoginLogDto_base: import("@nestjs/mapped-types").MappedType<Omit<LoginLog, "loginId">>;
export declare class CreateLoginLogDto extends CreateLoginLogDto_base {
}
export declare class DownloadExcel {
    loginLogIds: string;
}
export {};
