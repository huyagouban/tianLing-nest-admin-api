"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadExcel = exports.UpdateDictDto = exports.CreateDictDto = exports.ListDictDataDto = void 0;
const base_pages_entity_1 = require("../../../../common/public/base-pages-entity");
const dict_entity_1 = require("../entities/dict.entity");
class ListDictDataDto extends base_pages_entity_1.PagesDto {
}
exports.ListDictDataDto = ListDictDataDto;
class CreateDictDto extends dict_entity_1.Dict {
}
exports.CreateDictDto = CreateDictDto;
class UpdateDictDto extends dict_entity_1.Dict {
}
exports.UpdateDictDto = UpdateDictDto;
class DownloadExcel {
}
exports.DownloadExcel = DownloadExcel;
//# sourceMappingURL=dict.dto.js.map