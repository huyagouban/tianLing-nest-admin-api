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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("./entities/role.entity");
const role_menu_entity_1 = require("./entities/role.menu.entity");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const paginationResult_utils_1 = require("../../../utils/PaginationResult/paginationResult.utils");
const ajaxResult_1 = require("../../../common/ajaxResult");
const ExcelService_utils_1 = require("../../../utils/ExcelService/ExcelService.utils");
const user_constants_1 = require("../../../common/constants/user.constants");
const base_status_enums_1 = require("../../../common/public/base-status.enums");
const user_role_entity_1 = require("../user/entities/user.role.entity");
const excelHeader = [
    '角色名称', '字符权限', '角色顺序', 'status', '备注', ,
];
let RoleService = class RoleService {
    constructor(entityManager, role, roleMenu, userRole) {
        this.entityManager = entityManager;
        this.role = role;
        this.roleMenu = roleMenu;
        this.userRole = userRole;
    }
    async add(role) {
        const { menuIds, ...roleInfo } = role;
        await this.entityManager.transaction(async (manager) => {
            const result = await manager.insert(role_entity_1.Role, roleInfo);
            const roleId = result.identifiers[0].roleId;
            if (!(0, class_validator_1.isEmpty)(menuIds)) {
                await manager.insert(role_menu_entity_1.RoleMenu, menuIds.map((menuId) => ({ roleId, menuId })));
            }
        });
    }
    async findAll(query) {
        let endTime;
        if (query.startAndEndTime) {
            endTime = new Date(query.startAndEndTime[1]);
        }
        const toRoleId = 1;
        const paginationService = new paginationResult_utils_1.PaginationService(this.role);
        const res = await paginationService.paginate({
            currentPage: query.currentPage,
            pageSize: query.pageSize,
            options: {
                where: [{
                        roleName: (0, typeorm_2.Like)(`%${query.roleName ? query.roleName : ''}%`),
                        roleKey: (0, typeorm_2.Like)(`%${query.roleKey ? query.roleKey : ''}%`),
                        status: (0, typeorm_2.Like)(`%${query.status ? query.status : ''}%`),
                        createDate: query.startAndEndTime ? (0, typeorm_2.Between)(new Date(query.startAndEndTime[0]), new Date(endTime.setDate(endTime.getDate() + 1))) : undefined
                    },],
                order: {
                    createDate: "ASC",
                }
            },
        });
        return ajaxResult_1.AjaxResult.success(res);
    }
    async findOne(id) {
        const role = await this.role.findOne({
            where: {
                roleId: id
            }
        });
        const roleMenu = await this.roleMenu.find({
            where: {
                roleId: id
            }
        });
        return { ...role, menuIds: roleMenu.map(menu => menu.menuId) };
    }
    async update(roleId, role) {
        const { menuIds, ...roleInfo } = role;
        await this.entityManager.transaction(async (manager) => {
            await manager.update(role_entity_1.Role, roleId, roleInfo);
            await manager.delete(role_menu_entity_1.RoleMenu, { roleId });
            if (!(0, class_validator_1.isEmpty)(menuIds)) {
                await manager.insert(role_menu_entity_1.RoleMenu, menuIds.map((menuId) => ({ roleId, menuId })));
            }
        });
    }
    async remove(ids) {
        await this.entityManager.transaction(async (manager) => {
            await manager.delete(role_entity_1.Role, ids);
            await manager.delete(role_menu_entity_1.RoleMenu, { roleId: (0, typeorm_2.In)(ids) });
        });
    }
    async checkRoleNameUnique(role) {
        const res = await this.role.findOne({
            where: {
                roleName: role.roleName
            }
        });
        if (res && res.roleId !== role.roleId) {
            return false;
        }
        return true;
    }
    async checkRoleCodeUnique(role) {
        const res = await this.role.findOne({
            where: {
                roleKey: role.roleKey
            }
        });
        if (res && res.roleId !== role.roleId) {
            return false;
        }
        return true;
    }
    async downloadExcel(roleIds) {
        const list = await this.role.find({
            where: {
                roleId: (0, typeorm_2.In)(roleIds)
            }
        });
        const excelList = list.map(item => {
            delete item.createDate;
            delete item.updateDate;
            delete item.roleId;
            item.status = item.status === '1' ? '正常' : '停用';
            return Object.values(item);
        });
        const excelService = new ExcelService_utils_1.DownloadExcelService();
        const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '批量用户导出');
        return ajaxResult_1.AjaxResult.success(excelFile);
    }
    async selectRole(query) {
        let list = await this.role.find();
        list = list.filter(item => item.roleId !== user_constants_1.UserConstants.SUPER_ROLE);
        return ajaxResult_1.AjaxResult.success(list);
    }
    async selectRoleByUserId(userId) {
        return this.role
            .createQueryBuilder('r')
            .leftJoin('sys_user_role', 'ur', 'r.roleId= ur.roleIds')
            .where('ur.userId = :userId', { userId })
            .andWhere('r.status = :status', { status: base_status_enums_1.BaseStatusEnums.NORMAL })
            .getMany();
    }
    async selectRoleByUserIdByProfile(roleId) {
        return await this.role.findOne({ where: { roleId: roleId } });
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(role_menu_entity_1.RoleMenu)),
    __param(3, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map