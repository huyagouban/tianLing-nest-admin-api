import { Role } from '../entities/role.entity';
import { PagesDto } from "src/common/public/base-pages-entity";
declare const CreateRoleDto_base: import("@nestjs/mapped-types").MappedType<Omit<Role, "roleId">>;
export declare class CreateRoleDto extends CreateRoleDto_base {
    menuIds?: number[];
    deptIds?: number[];
}
export declare class ListRoleDto extends PagesDto {
    roleName?: string;
    roleKey?: string;
    status?: string;
    roleIds?: string;
    startAndEndTime: string[];
}
declare const UpdateRoleDto_base: import("@nestjs/mapped-types").MappedType<Omit<Role, never>>;
export declare class UpdateRoleDto extends UpdateRoleDto_base {
    menuIds?: number[];
    deptIds?: number[];
}
export {};
