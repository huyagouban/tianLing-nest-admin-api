"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeUtils = void 0;
const DEFAULT_CONFIG = {
    id: 'id',
    pid: 'pid',
    children: 'children',
};
class TreeUtils {
    static getConfig(config) {
        return Object.assign({}, DEFAULT_CONFIG, config);
    }
    static listToTree(list, config = {}) {
        const conf = TreeUtils.getConfig(config);
        const nodeMap = new Map();
        const result = [];
        const { id, pid, children } = conf;
        for (const node of list) {
            node[children] = node[children] || [];
            nodeMap.set(node[id], node);
        }
        for (const node of list) {
            const parent = nodeMap.get(node[pid]);
            (parent ? parent[children] : result).push(node);
        }
        return result;
    }
    static treeToList(tree, config = {}) {
        const conf = TreeUtils.getConfig(config);
        const result = [...tree];
        const { children } = conf;
        for (let i = 0; i < result.length; i++) {
            if (!result[i][children])
                continue;
            result.splice(i + 1, 0, ...result[i][children]);
        }
        return result;
    }
    static eachTree(tree, callBack, parent) {
        tree.forEach((item) => {
            const newNode = callBack(item, parent) || item;
            if (item.children) {
                TreeUtils.eachTree(item.children, callBack, newNode);
            }
        });
    }
}
exports.TreeUtils = TreeUtils;
//# sourceMappingURL=tree.utils.js.map