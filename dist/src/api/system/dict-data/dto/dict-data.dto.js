"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadExcel = exports.UpdateDictDataDto = exports.CreateDictDataDto = exports.ListDictDataDto = void 0;
const base_pages_entity_1 = require("../../../../common/public/base-pages-entity");
const dict_data_entity_1 = require("../entities/dict-data.entity");
class ListDictDataDto extends base_pages_entity_1.PagesDto {
}
exports.ListDictDataDto = ListDictDataDto;
class CreateDictDataDto extends dict_data_entity_1.DictData {
}
exports.CreateDictDataDto = CreateDictDataDto;
class UpdateDictDataDto extends dict_data_entity_1.DictData {
}
exports.UpdateDictDataDto = UpdateDictDataDto;
class DownloadExcel {
}
exports.DownloadExcel = DownloadExcel;
//# sourceMappingURL=dict-data.dto.js.map