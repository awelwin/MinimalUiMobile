import { IForm } from "src/app/employee-feature/ngrx/state";
import { IEntity } from "../IEntity";
import { IActionSheetButton } from "./IActionSheetButton";


export interface IActionSheet<T extends IEntity> {
    isOpen: boolean,
    entity: T,
    buttons: IActionSheetButton<IForm<T>>[]
}