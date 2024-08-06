import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseArrayPipe, Res } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, ListRoleDto, UpdateRoleDto } from './dto/role.dto';
import { AjaxResult } from "src/common/ajaxResult";
import { RequirePermissions } from "src/utils/decorator/require-permissions.decorator";
import { Log } from "src/utils/decorator/log.decorator";
import { OperType } from "src/common/class/oper-log-enums";
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }
  /**
   * 添加角色
   * @param role 添加的角色对象
   */
  @Post('add')
  @RequirePermissions('sys_role_add')
  @Log({ title: '新增角色', operType: OperType.ADD })
  async add(@Body() role: CreateRoleDto): Promise<AjaxResult> {
    if (!await this.roleService.checkRoleNameUnique(role)) {
      return AjaxResult.error(`新增角色${role.roleName}失败，角色名称已存在`)
    }
    if (!(await this.roleService.checkRoleCodeUnique(role))) {
      return AjaxResult.error(`新增角色${role.roleName}失败，角色权限已存在`)
    }
    return AjaxResult.success(await this.roleService.add(role));
  }
  /**
   * 获取角色列表
   */
  @Get('list')
  findAll(@Query() query: ListRoleDto): Promise<AjaxResult> {
    return this.roleService.findAll(query);
  }
  /**
   * 获取角色详情
   * @param id 角色ID
   */
  @Get('list/:id')
  async findOne(@Param('id') id: string): Promise<AjaxResult> {
    return AjaxResult.success(await this.roleService.findOne(+id));
  }
  /**
   * 更新角色
   * @param id 角色ID
   * @param updateRole 更新的对象
   */
  @Put('update/:id')
  @RequirePermissions('sys_role_edit')
  @Log({ title: '修改角色', operType: OperType.UPDATE })
  async update(@Param('id') id: number, @Body() updateRole: UpdateRoleDto): Promise<AjaxResult> {
    if (!await this.roleService.checkRoleNameUnique(updateRole)) {
      return AjaxResult.error(`修改角色${updateRole.roleName}失败，角色名称已存在`)
    }
    if (!(await this.roleService.checkRoleCodeUnique(updateRole))) {
      return AjaxResult.error(`修改角色${updateRole.roleName}失败，角色权限已存在`)
    }
    return AjaxResult.success(await this.roleService.update(id, updateRole));
  }
  /**
   * 删除角色
   * @param id 角色ID
   */
  @Delete('delete/:id')
  @RequirePermissions('sys_role_delete')
  @Log({ title: '删除角色', operType: OperType.DELETE })
  async delete(@Param('id', new ParseArrayPipe({ items: Number })) id: number[]): Promise<AjaxResult> {
    return AjaxResult.success(await this.roleService.remove(id));
  }
  /**导出excel */
  @Get('excel/download')
  @RequirePermissions('sys_role_export')
  @Log({ title: '导出角色', operType: OperType.EXPORT })
  async downloadExcel(@Res({ passthrough: true }) response: Response, @Query() query: ListRoleDto,): Promise<AjaxResult> {
    try {
      let ids = query.roleIds.split(',').map(Number);
      return await this.roleService.downloadExcel(ids);
    } catch (error) {
      // 考虑在此处记录错误或通过HttpFilter统一处理
      return AjaxResult.error(error.message);

    }
  }
  /**
   * 获取角色下拉列表
   */
  @Get('selectRole')
  async selectRole(@Query() query: ListRoleDto): Promise<AjaxResult> {
    return this.roleService.selectRole(query);
  }
}
