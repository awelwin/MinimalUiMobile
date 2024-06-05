import { Component } from '@angular/core';
import { IModalComponent } from './IModalComponent'
import { IEntity } from '../../common/dto/IEntity';
import { IonButton } from "@ionic/angular/standalone";
import { ModalController } from '@ionic/angular';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/Infrastructure/state management/store/AppState';
import { StoreActionTypes } from 'src/app/Infrastructure/state management/store/StoreActionTypes';
import { selectEmployeeList_ModalEntity } from 'src/app/Infrastructure/state management/store/EmployeeListSelectors';
import { Employee } from 'src/app/common/dto/Employee';
import { Observable } from 'rxjs';

@Component({
    selector: 'confirm-delete',
    standalone: true,
    imports: [IonButton, NgFor, NgIf, AsyncPipe],
    templateUrl: './confirm-delete-modal.component.html',
    styleUrl: './confirm-delete-modal.component.scss'
})
export class ConfirmDeleteModalComponent implements IModalComponent {

    _employee$!: Observable<Employee>;

    constructor(
        modalCtrl: ModalController,
        private store: Store<IAppState>) {

        this._employee$ = this.store.select(selectEmployeeList_ModalEntity)
    }

    confirm(emp: Employee): void {
        this.store.dispatch({
            type: StoreActionTypes.EmployeeList_DeleteRequestConfirmed, payload: emp
        })
    }

    cancel() {
        this.store.dispatch({
            type: StoreActionTypes.EmployeeList_ModalDismiss
        });
    }

}
