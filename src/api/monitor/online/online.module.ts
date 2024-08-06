import { Module, forwardRef } from '@nestjs/common';
import { OnlineService } from './online.service';
import { OnlineController } from './online.controller';
import { LoginModule } from "src/api/login/login.module";
@Module({
  imports: [
    forwardRef(() => LoginModule),
  ],
  controllers: [OnlineController],
  providers: [OnlineService],
  exports: [OnlineService],
})
export class OnlineModule { }
