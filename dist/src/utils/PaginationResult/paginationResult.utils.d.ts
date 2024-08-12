import { Repository, FindOneOptions } from 'typeorm';
export declare class PaginationResult<T> {
    total: number;
    pageSize: number;
    currentPage: number;
    list: T[];
}
export declare class PaginationService<T> {
    private repository;
    constructor(repository: Repository<T>);
    paginate(params: {
        currentPage: number;
        pageSize: number;
        options?: FindOneOptions<T>;
    }): Promise<PaginationResult<T>>;
}
