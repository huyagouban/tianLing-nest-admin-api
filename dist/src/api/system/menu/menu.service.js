"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const menu_entity_1 = require("./entities/menu.entity");
const menu_vo_1 = require("./vo/menu.vo");
const tree_utils_1 = require("../../../utils/tree/tree.utils");
const ajaxResult_1 = require("../../../common/ajaxResult");
const base_status_enums_1 = require("../../../common/public/base-status.enums");
const menu_constants_1 = require("../../../common/constants/menu.constants");
const identity_utils_1 = require("../../../utils/security/identity.utils");
let MenuService = class MenuService {
    constructor(menu) {
        this.menu = menu;
    }
    create(createMenuDto) {
        const data = new menu_entity_1.Menu();
        data.parentId = createMenuDto.parentId;
        data.menuType = createMenuDto.menuType;
        data.icon = createMenuDto.icon;
        data.iconType = createMenuDto.iconType;
        data.menuName = createMenuDto.menuName;
        data.sortNum = createMenuDto.sortNum;
        data.isLink = createMenuDto.isLink;
        data.path = createMenuDto.path;
        data.component = createMenuDto.component;
        data.perms = createMenuDto.perms;
        data.isCache = createMenuDto.isCache;
        data.visible = createMenuDto.visible;
        data.status = createMenuDto.status;
        return this.menu.save(data);
    }
    async findAll(query) {
        const data = await this.menu.find({
            where: [{
                    menuName: (0, typeorm_1.Like)(`%${query.menuName ? query.menuName : ''}%`),
                    status: (0, typeorm_1.Like)(`%${query.status ? query.status : ''}%`)
                },],
            order: {
                sortNum: 'ASC'
            }
        });
        const menuTreeList = tree_utils_1.TreeUtils.listToTree(data, {
            id: "id",
            pid: 'parentId'
        });
        return ajaxResult_1.AjaxResult.success(menuTreeList);
    }
    async findOne(id) {
        const data = await this.menu.findOne({
            where: {
                id: id,
            }
        });
        return ajaxResult_1.AjaxResult.success(data);
    }
    async update(id, updateMenuDto) {
        const data = await this.menu.update(id, updateMenuDto);
        return ajaxResult_1.AjaxResult.success(data, '修改成功', true);
    }
    async remove(id) {
        const data = await this.menu.delete(id);
        return ajaxResult_1.AjaxResult.success(data, '删除成功', true);
    }
    async checkMenuChild(id) {
        const count = await this.menu.countBy({ parentId: id });
        return count > 0;
    }
    async selectUserMenuTree(userId) {
        let list = [];
        if (identity_utils_1.IdentityUtils.isAdmin(userId)) {
            list = await this.menu
                .createQueryBuilder('m')
                .where('m.status = :status', { status: base_status_enums_1.BaseStatusEnums.NORMAL })
                .andWhere('m.menuType IN (:...menuType)', { menuType: [menu_constants_1.MenuConstants.TYPE_DIR, menu_constants_1.MenuConstants.TYPE_MENU] })
                .orderBy('m.sortNum', 'ASC')
                .getMany();
        }
        else {
            list = await this.menu
                .createQueryBuilder('m')
                .leftJoin('sys_role_menu', 'rm', 'm.id = rm.menuId')
                .leftJoin('sys_user_role', 'ur', 'rm.roleId = ur.roleIds')
                .leftJoin('role', 'r', 'ur.roleIds = r.roleId')
                .where('ur.userId = :userId', { userId })
                .andWhere('m.status = :status', { status: base_status_enums_1.BaseStatusEnums.NORMAL })
                .andWhere('r.status = :status', { status: base_status_enums_1.BaseStatusEnums.NORMAL })
                .andWhere('m.menuType IN (:...menuType)', { menuType: [menu_constants_1.MenuConstants.TYPE_DIR, menu_constants_1.MenuConstants.TYPE_MENU] })
                .orderBy('m.sortNum', 'ASC')
                .distinct()
                .getMany();
        }
        return tree_utils_1.TreeUtils.listToTree(list, {
            id: "id",
            pid: 'parentId'
        });
    }
    buildMenuRouter(menus) {
        const routers = [];
        for (const menu of menus) {
            const router = new menu_vo_1.RouterTreeVo();
            router.name = menu.path;
            router.path = menu.isLink == '0' ? ('/' + menu.path) : menu.path;
            router.component = menu.parentId == 0 ? "layout" : menu.component;
            router.status = menu.status;
            router.visible = menu.visible,
                router.meta = {
                    icon: menu.icon,
                    isLink: menu.isLink,
                    isCache: menu.isCache,
                    iconType: menu.iconType,
                    title: menu.menuName
                };
            router.children = menu.children && this.buildMenuRouter(menu.children);
            routers.push(router);
        }
        return routers;
    }
    async selectMenuByUserId(userId) {
        return this.menu
            .createQueryBuilder('m')
            .leftJoin('sys_role_menu', 'rm', 'm.id = rm.menuId')
            .leftJoin('sys_user_role', 'ur', 'rm.roleId = ur.roleIds')
            .leftJoin('role', 'r', 'ur.roleids = r.roleId')
            .where('ur.userId = :userId', { userId })
            .andWhere('m.status = :status', { status: base_status_enums_1.BaseStatusEnums.NORMAL })
            .andWhere('r.status = :status', { status: base_status_enums_1.BaseStatusEnums.NORMAL })
            .distinct()
            .getMany();
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(menu_entity_1.Menu)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MenuService);
//# sourceMappingURL=menu.service.js.map