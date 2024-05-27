import { Component } from '@angular/core';
import { ModalChildComponent } from './modal-child.component'
import { ActionType } from '../../lib/ActionType';
import { IEntity } from '../../lib/IEntity';
import { IonButton } from "@ionic/angular/standalone";
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'yes-no',
    standalone: true,
    imports: [IonButton,],
    templateUrl: './yes-no-action.component.html',
    styleUrl: './yes-no-action.component.scss'
})
export class YesNoActionComponent<T extends IEntity> extends ModalChildComponent<T> {

    buttonClass: string = "";
    borderClass: string = ""

    constructor(modalCtrl: ModalController) { super(modalCtrl); }

    /*
     INIT */
    override ngOnInit() {

        //set style based on requested action type
        //NOTE DOES NOT WORK FOR IONIC (STYLES SET IN GLOBAL SCSS)
        switch (this.action?.actionType) {
            case ActionType.Delete:
                this.buttonClass = "btn btn-danger";
                this.borderClass = "border-danger"
                break;
            default:
                this.buttonClass = "btn btn-secondary"

        }
    }
}
