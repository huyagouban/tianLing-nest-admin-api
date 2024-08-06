import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * 基础时间实体
 */

export abstract class BaseTimeEntity {
    // 创建时间
    @CreateDateColumn({ type: "timestamp",comment: "创建时间" })
    createDate: Date

    // 更新时间
    @UpdateDateColumn({ type: "timestamp",comment: "更新时间" })
    updateDate: Date
}