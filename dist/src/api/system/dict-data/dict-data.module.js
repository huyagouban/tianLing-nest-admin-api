"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictDataModule = void 0;
const common_1 = require("@nestjs/common");
const dict_data_service_1 = require("./dict-data.service");
const dict_data_controller_1 = require("./dict-data.controller");
const dict_data_entity_1 = require("./entities/dict-data.entity");
const typeorm_1 = require("@nestjs/typeorm");
const dict_module_1 = require("../dict/dict.module");
let DictDataModule = class DictDataModule {
};
exports.DictDataModule = DictDataModule;
exports.DictDataModule = DictDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => dict_module_1.DictModule),
            typeorm_1.TypeOrmModule.forFeature([dict_data_entity_1.DictData])
        ],
        controllers: [dict_data_controller_1.DictDataController],
        providers: [dict_data_service_1.DictDataService],
        exports: [dict_data_service_1.DictDataService]
    })
], DictDataModule);
//# sourceMappingURL=dict-data.module.js.map