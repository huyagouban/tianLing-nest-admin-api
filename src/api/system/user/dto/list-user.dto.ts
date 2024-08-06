import { PagesDto } from "src/common/public/base-pages-entity";

export class ListUserDto  extends PagesDto {

    // 手机号码
    phoneNumber: string;


    //   用户名称
    userName: string;


    // 用户状态   0：停用 1：正常  
    status: string;


    //创建时间段，以逗号分隔的字符串
    startAndEndTime: string;


    /**用户ids */
    userIds:string;
}
