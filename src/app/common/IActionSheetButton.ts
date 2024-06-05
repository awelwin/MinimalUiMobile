export interface IActionSheetButton<T = any> {
    text?: string;
    role?: Role;
    icon?: string;
    cssClass?: string | string[];
    id?: string;
    htmlAttributes?: { [key: string]: any };
    handler?: () => boolean | void | Promise<boolean | void>;
    data?: T;
}

export enum Role {
    CANCEL = "cancel",
    DESTRUCTIVE = "destructive",
    SELECTED = "selected"
}

