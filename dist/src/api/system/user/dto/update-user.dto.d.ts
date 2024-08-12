import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    userId: number;
    nickName: string;
    phoneNumber: string;
    email: string;
    sex: string;
    userName: string;
    password: string;
    status: string;
    remark: string;
    updateDate: Date;
}
export {};
