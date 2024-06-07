
import { IEntity } from "../../employee-feature/lib/IEntity";

/**
 * ModalComponent - components placed inside a modal window
 */

export interface IModalComponent {

    confirm(entity: IEntity): void;

    cancel(): void;

}