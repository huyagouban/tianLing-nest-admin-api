import { Controller, Get, Post, Body, Param, Delete, Query, Put, ParseArrayPipe, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUserDto } from "./dto/list-user.dto";
import { AjaxResult } from 'src/common/ajaxResult';
import { Response } from 'express'; // 确保导入了express的Response类型
import { RequirePermissions } from "src/utils/decorator/require-permissions.decorator";
import { Logical } from 'src/common/constants/logical.constant'
import { Log } from "src/utils/decorator/log.decorator";
import { OperType } from "src/common/class/oper-log-enums";
declare interface Buffer extends ArrayBuffer { }
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  /**创建用户 */
  @Post()
  @RequirePermissions('sys_user_add')
  @Log({ title: '新增用户', operType: OperType.ADD })
  async create(@Body() createUserDto: CreateUserDto) {
    if (!await this.userService.checkUserNameUnique(createUserDto)) {
      return AjaxResult.error(`新增用户${createUserDto.userName}失败，用户名称已存在`)
    }
    return AjaxResult.success(await this.userService.create(createUserDto), '新增成功', true);
  }
  /**用户列表 */
  @Get('list')
  findAll(@Query() query: ListUserDto) {

    return this.userService.findAll(query);
  }
  /**用户详情 */
  @Get('info/:id')
  findOne(@Param('id') userId: number) {
    return this.userService.findOne(+userId);
  }
  /**修改用户 */
  @Put('update/:id')
  @RequirePermissions(['sys_user_edit', 'sys_user_resetPwd'], Logical.OR)
  @Log({ title: '修改用户', operType: OperType.UPDATE })
  async update(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto) {
    if (!await this.userService.checkUserNameUnique(updateUserDto)) {
      return AjaxResult.error(`修改用户${updateUserDto.userName}失败，用户名称已存在`)
    }
    return AjaxResult.success(await this.userService.update(userId, updateUserDto), '修改成功', true)
  }
  /**删除用户 */
  @Delete(':id')
  @RequirePermissions('sys_user_delete')
  @Log({ title: '删除用户', operType: OperType.DELETE })
  remove(@Param('id', new ParseArrayPipe({ items: Number })) id: number[]) {
    return this.userService.remove(id);
  }
  /**导出excel */
  @Get('excel/download')
  @RequirePermissions('sys_user_export')
  @Log({ title: '导出用户', operType: OperType.EXPORT })
  async downloadExcel(@Res({ passthrough: true }) response: Response, @Query() query: ListUserDto,): Promise<AjaxResult> {
    try {
      let ids = query.userIds.split(',').map(Number);
      return await this.userService.downloadExcel(ids);
    } catch (error) {
      // 考虑在此处记录错误或通过HttpFilter统一处理
      console.log(error, 'error+++++++++');

    }
  }
  /** 下载模板 */
  @Get('excel/temlate')
  async downloadExcelTemlate(): Promise<AjaxResult> {
    return await this.userService.downloadExcelTemlate();
  }
  /** 导入用户 */
  @Post('import')
  @RequirePermissions('sys_user_import')
  @Log({ title: '导入用户', operType: OperType.IMPORT })
  @UseInterceptors(FileInterceptor('file'))
  async importExcel(@UploadedFile() file: Express.Multer.File): Promise<AjaxResult> {
    return await this.userService.importExcel(file);
  }
}
