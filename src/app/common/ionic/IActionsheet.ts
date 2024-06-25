import { IEntity } from "../IEntity";
import { IForm } from "../IForm";
import { IActionSheetButton } from "./IActionSheetButton";


export interface IActionSheet<T extends IEntity> {
    isOpen: boolean,
    entity: T,
    buttons: IActionSheetButton<IForm<T>>[]
}