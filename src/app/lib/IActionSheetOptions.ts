import { AnimationBuilder } from "@angular/animations";
import { IActionSheetButton } from "./IActionSheetButton";

export interface IActionSheetOptions {
    header?: string;
    subHeader?: string;
    cssClass?: string | string[];
    buttons: (IActionSheetButton | string)[];
    backdropDismiss?: boolean;
    translucent?: boolean;
    animated?: boolean;
    mode?: Mode;
    keyboardClose?: boolean;
    id?: string;
    htmlAttributes?: { [key: string]: any };

    enterAnimation?: AnimationBuilder;
    leaveAnimation?: AnimationBuilder;
}

export enum Mode {
    IOS = "ios",
    MD = "md"
}

