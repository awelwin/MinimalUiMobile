import { Component } from '@angular/core';
import { IModalComponent } from '../../../common/IModalComponent'
import { IonButton } from "@ionic/angular/standalone";
import { ModalController } from '@ionic/angular';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { EmployeeFeatureAction } from 'src/app/Infrastructure/ngrx/employee-feature/actions';
import { modalEntity } from 'src/app/Infrastructure/ngrx/employee-feature/selectors';
import { Employee } from 'src/app/common/dto/Employee';
import { Observable } from 'rxjs';
import { IEmployeeFeatureState } from 'src/app/Infrastructure/ngrx/employee-feature/state';

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
        private store: Store<IEmployeeFeatureState>) {

        this._employee$ = this.store.select(modalEntity)
    }

    confirm(emp: Employee): void {
        this.store.dispatch({
            type: EmployeeFeatureAction.DeleteRequestConfirmed, payload: emp
        })
    }

    cancel() {
        this.store.dispatch({
            type: EmployeeFeatureAction.ModalDismiss
        });
    }

}
