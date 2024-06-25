import { EntityOperation } from "./EntityOperation";
import { IEntity } from "./IEntity";

export interface IForm<T extends IEntity> {
    operation: EntityOperation;
    entity: T;
}