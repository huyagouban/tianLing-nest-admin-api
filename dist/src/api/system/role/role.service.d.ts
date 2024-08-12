import { CreateRoleDto, ListRoleDto, UpdateRoleDto } from './dto/role.dto';
import { Role } from "./entities/role.entity";
import { RoleMenu } from "./entities/role.menu.entity";
import { Repository, EntityManager } from 'typeorm';
import { AjaxResult } from 'src/common/ajaxResult';
import { RoleInfoVo } from "./vo/role.vo";
import { UserRole } from "../user/entities/user.role.entity";
export declare class RoleService {
    private entityManager;
    private role;
    private roleMenu;
    private userRole;
    constructor(entityManager: EntityManager, role: Repository<Role>, roleMenu: Repository<RoleMenu>, userRole: Repository<UserRole>);
    add(role: CreateRoleDto): Promise<void>;
    findAll(query: ListRoleDto): Promise<AjaxResult>;
    findOne(id: number): Promise<RoleInfoVo>;
    update(roleId: number, role: UpdateRoleDto): Promise<void>;
    remove(ids: number[]): Promise<void>;
    checkRoleNameUnique(role: Partial<Role>): Promise<boolean>;
    checkRoleCodeUnique(role: Partial<Role>): Promise<boolean>;
    downloadExcel(roleIds: number[]): Promise<AjaxResult>;
    selectRole(query: ListRoleDto): Promise<AjaxResult>;
    selectRoleByUserId(userId: number): Promise<Role[]>;
    selectRoleByUserIdByProfile(roleId: number): Promise<Role>;
}
