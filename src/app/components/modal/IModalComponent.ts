
import { IEntity } from "../../common/dto/IEntity";

/**
 * ModalComponent - components placed inside a modal window
 */

export interface IModalComponent {

    confirm(entity: IEntity): void;

    cancel(): void;

}