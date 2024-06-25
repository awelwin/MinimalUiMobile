import { IEntity } from "../IEntity";

export interface IModal<T extends IEntity> {
    isOpen: boolean,
    entity: T
}