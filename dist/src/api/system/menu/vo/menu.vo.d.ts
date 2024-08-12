import { Menu } from "../entities/menu.entity";
export declare class MenuTreeVo extends Menu {
    children?: MenuTreeVo[];
}
export declare class RouterMeta {
    title: string;
    icon: string;
    iconType: string;
    isLink: string;
    isCache: string;
}
export declare class RouterTreeVo {
    name: string;
    path: string;
    component: string;
    children: RouterTreeVo[];
    meta: RouterMeta;
    visible: string;
    status: string;
}
