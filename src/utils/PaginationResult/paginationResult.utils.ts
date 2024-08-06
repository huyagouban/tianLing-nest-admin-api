
import { Repository, FindOneOptions } from 'typeorm';

/** 定义通用的分页类型  */
export class PaginationResult<T> {
    /**总条数 */
    total: number;
    /**每页条数 */
    pageSize: number;
    /**当前页 */
    currentPage: number;
    /**查询出来的列表对象 */
    list: T[];
}

/**
 * 通用的分页 service
 * 整个类接收一个范型对象 T ，它对应的是需要查询的 entity 对象
构造函数中接收一个 repository ，它是范型 T（entity对象） 所对应的 repository
 */
export class PaginationService<T> {
    constructor(private repository: Repository<T>) { }
    /**
     * 
     * @param params 首先接收页码参数currentPage ，每一页的条数 pageSize ，以及一个拓展查询条件 options 。 options 的类型是 TypeORM 中的 FindOneOptions
     * @returns 
     */
    async paginate(params: {
        currentPage: number;
        pageSize: number;
        options?: FindOneOptions<T>;
    }): Promise<PaginationResult<T>> {
        const { currentPage, pageSize, options = {} } = params;
        /**
         * 使用 findAndCount 查询出当前条件的条数以及结果，其中 take 对应原生 sql 语句的 limit ， skip 对应原生 sql 语句的 offset
         */
        const [result, total] = await this.repository.findAndCount({
            take: pageSize,
            skip: pageSize * (currentPage - 1),
            ...options,
        });
        /**
         * 最后组装一下参数返回给调用方
         */
        const paginationResult = new PaginationResult<T>();
        paginationResult.list = result;
        paginationResult.total =Number(total);
        paginationResult.pageSize = Number(pageSize);
        paginationResult.currentPage = Number(currentPage);
        return paginationResult;
    }
}
