import { Module, forwardRef } from '@nestjs/common';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Dict } from "src/api/system/dict/entities/dict.entity";
import { DictData } from "src/api/system/dict-data/entities/dict-data.entity";
import { DictDataModule } from "src/api/system/dict-data/dict-data.module";
@Module({
  imports: [
    forwardRef(() => DictDataModule),
    TypeOrmModule.forFeature([Dict, DictData])],
  controllers: [DictController],
  providers: [DictService],
  exports: [DictService],
})
export class DictModule { }
