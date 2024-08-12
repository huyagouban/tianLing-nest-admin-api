import { RoleService } from './role.service';
import { CreateRoleDto, ListRoleDto, UpdateRoleDto } from './dto/role.dto';
import { AjaxResult } from "src/common/ajaxResult";
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    add(role: CreateRoleDto): Promise<AjaxResult>;
    findAll(query: ListRoleDto): Promise<AjaxResult>;
    findOne(id: string): Promise<AjaxResult>;
    update(id: number, updateRole: UpdateRoleDto): Promise<AjaxResult>;
    delete(id: number[]): Promise<AjaxResult>;
    downloadExcel(response: Response, query: ListRoleDto): Promise<AjaxResult>;
    selectRole(query: ListRoleDto): Promise<AjaxResult>;
}
