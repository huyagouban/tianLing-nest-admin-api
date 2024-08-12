/// <reference types="multer" />
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUserDto } from "./dto/list-user.dto";
import { AjaxResult } from 'src/common/ajaxResult';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<AjaxResult<void>>;
    findAll(query: ListUserDto): Promise<AjaxResult<import("../../../utils/PaginationResult/paginationResult.utils").PaginationResult<import("./entities/user.entity").User>>>;
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
    update(userId: number, updateUserDto: UpdateUserDto): Promise<AjaxResult<void>>;
    remove(id: number[]): Promise<AjaxResult<import("typeorm").DeleteResult>>;
    downloadExcel(response: Response, query: ListUserDto): Promise<AjaxResult>;
    downloadExcelTemlate(): Promise<AjaxResult>;
    importExcel(file: Express.Multer.File): Promise<AjaxResult>;
}
