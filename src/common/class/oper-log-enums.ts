/**
 * 业务操作类型
 * 备注需要跟字典管理的业务操作类型保持一致
 */
export enum OperType {
    /**
     * 其它
     */
    OTHER = '0',

    /**
     * 查询
     */
    SELECT = '1',

    /**
     * 新增
     */
    ADD = '2',

    /**
     * 修改
     */
    UPDATE = '3',

    /**
     * 删除
     */
    DELETE = '4',

    /**
     * 授权
     */
    GRANT = '5',

    /**
     * 导出
     */
    EXPORT = '6',

    /**
     * 导入
     */
    IMPORT = '7',

    /**
     * 强退
     */
    FORCE = '8',

    /**
     * 生成代码
     */
    GENCODE = '9',

    /**
     * 清空数据
     */
    CLEAN = '10',
}
