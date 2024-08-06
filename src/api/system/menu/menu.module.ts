import { Module,forwardRef } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from "./entities/menu.entity";
import { LoginModule } from "src/api/login/login.module";
@Module({
  imports:[
    forwardRef(()=>LoginModule),
    TypeOrmModule.forFeature([Menu]),    
  ],
  controllers: [MenuController],
  providers: [MenuService,],
  exports:[MenuService]
})
export class MenuModule {}
