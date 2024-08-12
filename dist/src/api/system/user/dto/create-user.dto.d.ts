import { User } from '../entities/user.entity';
declare const CreateUserDto_base: import("@nestjs/mapped-types").MappedType<Omit<User, "userId">>;
export declare class CreateUserDto extends CreateUserDto_base {
    roleIds?: number;
}
export {};
