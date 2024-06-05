import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RepositoryServiceFactory } from '../../RepositoryServiceFactory'
import { RepositoryService } from '../../RepositoryService';
import { Employee } from '../../../common/dto/Employee';
import { StoreActionTypes } from '../store/StoreActionTypes';
import { exhaustMap, map, switchMap, tap, EMPTY, of, observable, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';

@Injectable()
export class EmployeeListEffects {

    _repo: RepositoryService<Employee>;

    constructor(
        private repoFactory: RepositoryServiceFactory,
        private actions$: Actions,
        private actionSheetController: ActionSheetController,
        private modalCtrl: ModalController) {
        this._repo = repoFactory.getInstance<Employee>(Employee);
    }

    // Load -> loadResult
    EmployeeListLoad$ = createEffect(() => this.actions$.pipe(
        ofType(StoreActionTypes.EmployeeList_Load),
        exhaustMap(() => this._repo.get().pipe(
            map(result => ({ type: StoreActionTypes.EmployeeList_LoadResult, payload: result }))
        ))));


    // deleteRequestConfirmed -> deleteRequestPersisted
    employeeList_DeleteRequestConfirmed$ = createEffect(() => this.actions$.pipe(
        ofType(StoreActionTypes.EmployeeList_DeleteRequestConfirmed),
        exhaustMap((action: any) =>
            this._repo.delete(action.payload.id).pipe(
                map(result => ({ type: StoreActionTypes.EmployeeList_DeleteRequestPersisted, payload: action.payload })))
        )));

}
