"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMenuDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_menu_dto_1 = require("./create-menu.dto");
class UpdateMenuDto extends (0, mapped_types_1.PartialType)(create_menu_dto_1.CreateMenuDto) {
}
exports.UpdateMenuDto = UpdateMenuDto;
//# sourceMappingURL=update-menu.dto.js.map