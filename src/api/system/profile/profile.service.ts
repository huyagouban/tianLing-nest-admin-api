import { Injectable } from '@nestjs/common';
import { UserService } from "src/api/system/user/user.service";
import { User } from "src/api/system/user/entities/user.entity";
import { RoleService } from "src/api/system/role/role.service";
import { ProfileInfoVo } from "./vo/profile.vo";
import { UpdateProfileDto, UpdatePasswordDto } from "src/api/system/profile/entities/profile.entity";
import { IdentityUtils } from "src/utils/security/identity.utils";
import { Role } from "src/api/system/role/entities/role.entity";
import { UserConstants } from "src/common/constants/user.constants";
import { AjaxResult } from "src/common/ajaxResult";
import { PasswordUtils } from "src/utils/password/password.utils";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UserService,
    private roleService: RoleService,
  ) { }
  /**
   * 获取用户信息
   * @param userId
   */
  async profile(userId: number): Promise<ProfileInfoVo> {
    const userInfo: ProfileInfoVo = await this.userService.selectUserByUserId(userId);
    userInfo.roles = await this.getProfileRoles(userId);
    return userInfo;
  }
  /**
   * 更新用户信息
   * @param userInfo
   */
  async updateUserInfo(user: UpdateProfileDto): Promise<AjaxResult> {
    const {roles,...userInfo} =user;
    return AjaxResult.success(await this.userService.updateBasicInfo(userInfo))
  }
  /**
* 判断是否是超级管理员
* 获取用户角色
*/
  async getProfileRoles(userId: number): Promise<Role[] | Role> {
    if (IdentityUtils.isAdminUser(userId)) {
      return await this.roleService.selectRoleByUserIdByProfile(UserConstants.SUPER_ROLE);
    } else {
      const roles = await this.roleService.selectRoleByUserId(userId);
      return roles
    }
  }
  /**
   * 修改个人密码
   * @param user 
   */
  async updatePassword(userInfo: UpdatePasswordDto): Promise<AjaxResult> {
    const { userName, password } = userInfo;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.userName=:userName', { userName })
      .getOne();
    if (!await PasswordUtils.compare(userInfo.oldPassword, user.password)) {
      return AjaxResult.error('旧密码错误');
    }
    if (await PasswordUtils.compare(userInfo.newPassword, user.password)) {
      return AjaxResult.error('新密码不能与旧密码相同');
    }
    const newPassword = await PasswordUtils.create(userInfo.newPassword);
    return AjaxResult.success(await this.userService.updateBasicInfo({
      userId: user.userId,
      password: newPassword
    }));
  }
}
