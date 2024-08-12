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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const user_role_entity_1 = require("./entities/user.role.entity");
const typeorm_1 = require("@nestjs/typeorm");
const ajaxResult_1 = require("../../../common/ajaxResult");
const typeorm_2 = require("typeorm");
const paginationResult_utils_1 = require("../../../utils/PaginationResult/paginationResult.utils");
const ExcelService_utils_1 = require("../../../utils/ExcelService/ExcelService.utils");
const password_utils_1 = require("../../../utils/password/password.utils");
const fs = require("fs-extra");
const class_validator_1 = require("class-validator");
const identity_utils_1 = require("../../../utils/security/identity.utils");
const user_constants_1 = require("../../../common/constants/user.constants");
const role_service_1 = require("../role/role.service");
const sys_login_user_1 = require("../../../common/class/sys-login-user");
const menu_service_1 = require("../menu/menu.service");
const excelHeader = [
    '用户昵称', '用户手机', '邮箱', '性别（男、女）', '用户名称', '用户密码', '用户状态(正常、停用)', '头像地址', '备注',
];
const importExcelHeader = [
    'nickName', 'phoneNumber', 'email', 'sex', 'userName', 'password', 'status', 'avatar', 'remark',
];
let UserService = class UserService {
    constructor(entityManager, user, userRole, roleService, menuService) {
        this.entityManager = entityManager;
        this.user = user;
        this.userRole = userRole;
        this.roleService = roleService;
        this.menuService = menuService;
    }
    async create(user) {
        const { roleIds, ...userInfo } = user;
        await this.entityManager.transaction(async (manager) => {
            userInfo.password = await password_utils_1.PasswordUtils.create(userInfo.password);
            const result = await manager.insert(user_entity_1.User, userInfo);
            const userId = result.identifiers[0].userId;
            if (!(0, class_validator_1.isEmpty)(roleIds)) {
                await manager.insert(user_role_entity_1.UserRole, { userId, roleIds });
            }
        });
    }
    async findAll(query) {
        let endTime;
        if (query.startAndEndTime) {
            endTime = new Date(query.startAndEndTime[1]);
        }
        const toUserId = 1;
        const paginationService = new paginationResult_utils_1.PaginationService(this.user);
        const res = await paginationService.paginate({
            currentPage: query.currentPage,
            pageSize: query.pageSize,
            options: {
                where: [{
                        phoneNumber: (0, typeorm_2.Like)(`%${query.phoneNumber ? query.phoneNumber : ''}%`),
                        userName: (0, typeorm_2.Like)(`%${query.userName ? query.userName : ''}%`),
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
    async findOne(userId) {
        const user = await this.user.findOne({
            where: {
                userId: userId,
            }
        });
        const roleIds = await this.userRole.find({
            where: {
                userId: userId
            }
        });
        return ajaxResult_1.AjaxResult.success({ ...user, roleIds: Number(roleIds.map(item => item.roleIds).toString()) });
    }
    async update(userId, updateUserDto) {
        let updateUserOption = {
            ...updateUserDto,
            updateDate: new Date()
        };
        if (updateUserDto.password) {
            updateUserOption.password = await password_utils_1.PasswordUtils.create(updateUserOption.password);
        }
        const { roleIds, ...userInfo } = updateUserOption;
        await this.entityManager.transaction(async (manager) => {
            await manager.update(user_entity_1.User, userId, userInfo);
            await manager.delete(user_role_entity_1.UserRole, { userId });
            if (!(0, class_validator_1.isEmpty)(roleIds)) {
                await manager.insert(user_role_entity_1.UserRole, { userId, roleIds });
            }
        });
    }
    async remove(userId) {
        const data = await this.user.delete(userId);
        return ajaxResult_1.AjaxResult.success(data, '删除成功', true);
    }
    async downloadExcel(userId) {
        const list = await this.user.find({
            where: {
                userId: (0, typeorm_2.In)(userId)
            }
        });
        const excelList = list.map(item => {
            delete item.createDate;
            delete item.updateDate;
            delete item.userId;
            item.sex = item.sex === '1' ? '男' : item.sex === '1' ? '女' : '';
            item.status = item.status === '1' ? '正常' : '停用';
            return Object.values(item);
        });
        const excelService = new ExcelService_utils_1.DownloadExcelService();
        const excelFile = await excelService.exportDataToExcel(excelList, 'Sheet1', excelHeader, '批量用户导出');
        return ajaxResult_1.AjaxResult.success(excelFile);
    }
    async downloadExcelTemlate() {
        const excelService = new ExcelService_utils_1.DownloadExcelService();
        const excelFile = await excelService.exportDataToExcel([], 'Sheet1', excelHeader, '批量用户导入模板');
        return ajaxResult_1.AjaxResult.success(excelFile);
    }
    async importExcel(file) {
        try {
            if (!file.originalname.endsWith('.xlsx') && !file.originalname.endsWith('.xls')) {
                ajaxResult_1.AjaxResult.error('请上传excel文件');
            }
            const tempFilePath = `./uploads/files/${file.originalname}`;
            await fs.move(file.path, tempFilePath);
            const excelService = new ExcelService_utils_1.DownloadExcelService();
            const result = await excelService.importExcel(tempFilePath);
            const importExcelList = result.map(item => {
                return {
                    nickName: item[0],
                    phoneNumber: item[1],
                    email: item[2].text ? item[2].text : item[2],
                    sex: item[3] === '男' ? '1' : item[3] === '女' ? '0' : item[4],
                    userName: item[4],
                    password: item[5],
                    status: item[6] === '正常' ? '1' : item[6] === '停用' ? '0' : '',
                    remark: item[7],
                };
            });
            const data = await this.user.save(importExcelList);
            await fs.remove(tempFilePath);
            return ajaxResult_1.AjaxResult.success();
        }
        catch (error) {
            return ajaxResult_1.AjaxResult.error(error.message);
        }
    }
    async checkUserNameUnique(user) {
        const res = await this.user.findOne({
            where: {
                userName: (0, typeorm_2.Like)(`%${user.userName ? user.userName : ''}%`),
                userId: user.userId ? user.userId : undefined
            }
        });
        if (res && res.userId !== user.userId) {
            return false;
        }
        return true;
    }
    async loginUserInfo(jwtKey) {
        const user = await this.user.findOne({
            where: {
                userId: jwtKey.userId
            }
        });
        const roles = await this.getRolePermission(jwtKey.userId);
        const permissions = await this.getMenuPermission(jwtKey.userId);
        const loginUser = new sys_login_user_1.LoginUser();
        loginUser.user = user;
        loginUser.roles = roles;
        loginUser.permissions = permissions;
        return loginUser;
    }
    async getRolePermission(userId) {
        if (identity_utils_1.IdentityUtils.isAdminUser(userId)) {
            return [user_constants_1.UserConstants.SUPER_ROLE_CODE];
        }
        else {
            const roles = await this.roleService.selectRoleByUserId(userId);
            return roles.map((role) => role.roleKey).filter(Boolean);
        }
    }
    async getMenuPermission(userId) {
        if (identity_utils_1.IdentityUtils.isAdminUser(userId)) {
            return [user_constants_1.UserConstants.SUPER_ROLE_PERMISSION];
        }
        else {
            const menus = await this.menuService.selectMenuByUserId(userId);
            return menus.map((menu) => menu.perms).filter(Boolean);
        }
    }
    async selectUserByUserId(userId) {
        return await this.user.findOne({
            where: {
                userId
            }
        });
    }
    async updateBasicInfo(user) {
        await this.user.update(user.userId, user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        typeorm_2.Repository,
        typeorm_2.Repository,
        role_service_1.RoleService,
        menu_service_1.MenuService])
], UserService);
//# sourceMappingURL=user.service.js.map