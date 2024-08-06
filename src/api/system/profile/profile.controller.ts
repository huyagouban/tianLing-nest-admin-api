import { Controller, Get, Body, Patch, Param, Delete, Req, Request, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AjaxResult } from "src/common/ajaxResult";
import { UpdateProfileDto, UpdatePasswordDto } from "src/api/system/profile/entities/profile.entity";
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from "src/api/login/interface/jwt-token.interface";
import { Log } from "src/utils/decorator/log.decorator";
import { OperType } from "src/common/class/oper-log-enums";
/**
 * 个人中心
 */
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
  ) { }
  /**
   * 个人信息
   */
  @Get()
  async profile(@Req() req: Request): Promise<AjaxResult> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const jwtKey: JwtToken = await this.jwtService.verify(token);
    return AjaxResult.success(await this.profileService.profile(jwtKey.userId));
  }

  /**
   * 修改个人基本信息
   */
  @Put('updateUserInfo')
  @Log({ title: '修改个人基本信息', operType: OperType.UPDATE })
  async updateUserInfo(@Body() user: UpdateProfileDto): Promise<AjaxResult> {
    return await this.profileService.updateUserInfo(user);
  }
  /**
   * 修改个人密码
   */
  @Put('UpdatePassword')
  @Log({ title: '修改个人密码', operType: OperType.UPDATE })
  async updatePassword(@Body() user: UpdatePasswordDto): Promise<AjaxResult> {
    return await this.profileService.updatePassword(user)
  }
}
