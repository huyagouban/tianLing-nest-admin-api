import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository } from 'typeorm';
import { Menu } from "./entities/menu.entity";
import { MenuTreeVo, RouterTreeVo } from "./vo/menu.vo";
import { AjaxResult } from "src/common/ajaxResult";
export declare class MenuService {
    private readonly menu;
    constructor(menu: Repository<Menu>);
    create(createMenuDto: CreateMenuDto): Promise<Menu>;
    findAll(query: {
        menuName?: string;
        status?: string;
    }): Promise<AjaxResult<MenuTreeVo[]>>;
    findOne(id: number): Promise<AjaxResult<Menu>>;
    update(id: number, updateMenuDto: UpdateMenuDto): Promise<AjaxResult<import("typeorm").UpdateResult>>;
    remove(id: number): Promise<AjaxResult<import("typeorm").DeleteResult>>;
    checkMenuChild(id: number): Promise<boolean>;
    selectUserMenuTree(userId: number): Promise<MenuTreeVo[]>;
    buildMenuRouter(menus: MenuTreeVo[]): RouterTreeVo[];
    selectMenuByUserId(userId: number): Promise<Menu[]>;
}
