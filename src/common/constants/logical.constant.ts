/**
 * 权限装饰器的验证模式
 */
export enum Logical {
    /**
     * 必须具有所有的元素
     */
    AND,

    /**
     * 只需具有其中一个元素
     */
    OR,
}
