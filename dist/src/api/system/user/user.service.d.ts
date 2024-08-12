/// <reference types="multer" />
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { UserRole } from "./entities/user.role.entity";
import { AjaxResult } from "../../../common/ajaxResult";
import { Repository, EntityManager } from 'typeorm';
import { ListUserDto } from "./dto/list-user.dto";
import { JwtToken } from "src/api/login/interface/jwt-token.interface";
import { RoleService } from "../role/role.service";
import { LoginUser } from "src/common/class/sys-login-user";
import { MenuService } from "../menu/menu.service";
export declare class UserService {
    private entityManager;
    private user;
    private userRole;
    private roleService;
    private menuService;
    constructor(entityManager: EntityManager, user: Repository<User>, userRole: Repository<UserRole>, roleService: RoleService, menuService: MenuService);
    create(user: CreateUserDto): Promise<void>;
    findAll(query: ListUserDto): Promise<AjaxResult<import("../../../utils/PaginationResult/paginationResult.utils").PaginationResult<User>>>;
    findOne(userId: number): Promise<AjaxResult<{
        roleIds: number;
        userId: number;
        nickName: string;
        phoneNumber?: string;
        email?: string;
        sex?: string;
        userName: string;
        password: string;
        status?: string;
        avatar?: string;
        remark: string;
        createDate: Date;
        updateDate: Date;
    }>>;
    update(userId: number, updateUserDto: UpdateUserDto): Promise<void>;
    remove(userId: number | number[]): Promise<AjaxResult<import("typeorm").DeleteResult>>;
    downloadExcel(userId: number[]): Promise<AjaxResult>;
    downloadExcelTemlate(): Promise<AjaxResult>;
    importExcel(file: Express.Multer.File): Promise<AjaxResult>;
    checkUserNameUnique(user: Partial<User>): Promise<boolean>;
    loginUserInfo(jwtKey: JwtToken): Promise<LoginUser>;
    getRolePermission(userId: number): Promise<string[]>;
    getMenuPermission(userId: number): Promise<string[]>;
    selectUserByUserId(userId: number): Promise<User>;
    updateBasicInfo(user: Partial<User>): Promise<void>;
}
