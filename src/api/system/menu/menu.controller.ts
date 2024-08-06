import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { AjaxResult } from "src/common/ajaxResult";
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from "src/api/login/interface/jwt-token.interface";
import { RequirePermissions } from "src/utils/decorator/require-permissions.decorator";
import { Log } from "src/utils/decorator/log.decorator";
import { OperType } from "src/common/class/oper-log-enums";
@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private jwtService: JwtService
  ) { }
  /**
   * 
   * @param createMenuDto 
   * @returns 新增菜单
   */
  @Post()
  @RequirePermissions('sys_menu_add')
  @Log({ title: '新增菜单', operType: OperType.ADD })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }
  /**
   * 
   * @param query 
   * @returns 查询菜单列表树
   */
  @Get('list')
  findAll(@Query() query: { menuName?: string, status?: string }) {

    return this.menuService.findAll(query);
  }
  /**
   * 
   * @param id 
   * @returns 查询菜单详情
   */
  @Get('info/:id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }
  /**
   * 
   * @param id 
   * @param updateMenuDto 
   * @returns 修改菜单
   */
  @Patch(':id')
  @RequirePermissions('sys_menu_edit')
  @Log({ title: '修改菜单', operType: OperType.UPDATE })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }
  /**
   * 
   * @param id 
   * @returns 删除菜单
   */
  @Delete(':id')
  @RequirePermissions('sys_menu_delete')
  @Log({ title: '删除菜单', operType: OperType.DELETE })
  async remove(@Param('id') id: number) {
    if (await this.menuService.checkMenuChild(id)) {
      return AjaxResult.error("有子菜单不可删除！")
    }
    return this.menuService.remove(+id);
  }
  /**
  * 查询用户路由信息
  * @returns 用户路由信息
  */
  @Get('getRouters')
  async getUserRouters(@Req() req: Request): Promise<AjaxResult> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const jwtKey: JwtToken = await this.jwtService.verify(token);
    const list = await this.menuService.selectUserMenuTree(jwtKey.userId);
    return AjaxResult.success(this.menuService.buildMenuRouter(list));
  }
}

