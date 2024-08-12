interface TreeConfig {
    id: string;
    pid: string;
    children: string;
}
export declare class TreeUtils {
    static getConfig(config: Partial<TreeConfig>): TreeConfig;
    static listToTree<T = any>(list: any[], config?: Partial<TreeConfig>): T[];
    static treeToList<T = any>(tree: any[], config?: Partial<TreeConfig>): T[];
    static eachTree<T = any>(tree: any[], callBack: (item: T, parent?: T) => any, parent?: T): void;
}
export {};
