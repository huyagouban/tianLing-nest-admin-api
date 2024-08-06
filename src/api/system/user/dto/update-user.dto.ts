import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    //   用户id
    userId:number;

    //   用户昵称
    nickName: string;


    // 手机号码
    phoneNumber: string;


    // 邮箱地址
    email: string;


    // 用户性别   0：女 1：男
    sex: string;


    //   用户名称
    userName: string;


    //   用户密码
    password: string;


    // 用户状态   0：停用 1：正常  
    status: string;


    //   备注
    remark: string;

    //更新时间
    updateDate: Date
}
