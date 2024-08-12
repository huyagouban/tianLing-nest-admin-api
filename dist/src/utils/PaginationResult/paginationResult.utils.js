"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationService = exports.PaginationResult = void 0;
class PaginationResult {
}
exports.PaginationResult = PaginationResult;
class PaginationService {
    constructor(repository) {
        this.repository = repository;
    }
    async paginate(params) {
        const { currentPage, pageSize, options = {} } = params;
        const [result, total] = await this.repository.findAndCount({
            take: pageSize,
            skip: pageSize * (currentPage - 1),
            ...options,
        });
        const paginationResult = new PaginationResult();
        paginationResult.list = result;
        paginationResult.total = Number(total);
        paginationResult.pageSize = Number(pageSize);
        paginationResult.currentPage = Number(currentPage);
        return paginationResult;
    }
}
exports.PaginationService = PaginationService;
//# sourceMappingURL=paginationResult.utils.js.map