import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalAction } from "./ModalAction";
import { IEntity } from "../../lib/IEntity";
import { ModalController } from '@ionic/angular';
import { ModalRole } from "./ModalRole";

/**
 *  components placed inside a moda */
@Component({
    selector: "abstract",
    standalone: true,
    template: ""
})
export abstract class ModalChildComponent<T extends IEntity> {

    constructor(private modalCtrl: ModalController) { }

    @Input()
    action: ModalAction<T> | null = null;

    ngOnInit() { }

    accept() {
        return this.modalCtrl.dismiss(this.action, ModalRole.CONFIRM);
    }
    cancel() {
        return this.modalCtrl.dismiss(this.action, ModalRole.CANCEL);
    }

}