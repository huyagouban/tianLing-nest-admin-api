import { Module ,forwardRef} from '@nestjs/common';
import { DictDataService } from './dict-data.service';
import { DictDataController } from './dict-data.controller';
import { DictData } from "src/api/system/dict-data/entities/dict-data.entity";
import { TypeOrmModule } from '@nestjs/typeorm'
import {DictModule} from 'src/api/system/dict/dict.module';
@Module({
  imports: [
    forwardRef(() => DictModule),
    TypeOrmModule.forFeature([DictData])],
  controllers: [DictDataController],
  providers: [DictDataService],
  exports: [DictDataService]
})
export class DictDataModule {}
