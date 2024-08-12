import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { AjaxResult } from "src/common/ajaxResult";
import { JwtService } from '@nestjs/jwt';
export declare class MenuController {
    private readonly menuService;
    private jwtService;
    constructor(menuService: MenuService, jwtService: JwtService);
    create(createMenuDto: CreateMenuDto): Promise<import("./entities/menu.entity").Menu>;
    findAll(query: {
        menuName?: string;
        status?: string;
    }): Promise<AjaxResult<import("./vo/menu.vo").MenuTreeVo[]>>;
    findOne(id: string): Promise<AjaxResult<import("./entities/menu.entity").Menu>>;
    update(id: string, updateMenuDto: UpdateMenuDto): Promise<AjaxResult<import("typeorm").UpdateResult>>;
    remove(id: number): Promise<AjaxResult<import("typeorm").DeleteResult>>;
    getUserRouters(req: Request): Promise<AjaxResult>;
}
