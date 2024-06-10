import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RepositoryServiceFactory } from '../../common/service/RepositoryServiceFactory'
import { RepositoryService } from '../../common/service/RepositoryService';
import { Employee } from '../lib/Employee';
import { exhaustMap, map, switchMap, tap, EMPTY, of, observable, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { EmployeeFeatureAction, employeeFeature_NavigateAction } from './actions';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeListEffects {

    _repo: RepositoryService<Employee>;

    constructor(
        private repoFactory: RepositoryServiceFactory,
        private actions$: Actions,
        private actionSheetController: ActionSheetController,
        private modalCtrl: ModalController,
        private router: Router) {
        this._repo = repoFactory.getInstance<Employee>(Employee);
    }

    //navigate
    EmployeeFeatureNavigate = createEffect(() => this.actions$.pipe(
        ofType(employeeFeature_NavigateAction),
        tap(action => { this.router.navigate(action.path) }),
    ),
        { dispatch: false }
    );

    // Load -> loadResult
    EmployeeListLoad$ = createEffect(() => this.actions$.pipe(
        ofType(EmployeeFeatureAction.Load),
        exhaustMap(() => this._repo.get().pipe(
            map(result => ({ type: EmployeeFeatureAction.LoadResult, payload: result }))
        ))));


    // deleteRequestConfirmed -> deleteRequestPersisted
    employeeList_DeleteRequestConfirmed$ = createEffect(() => this.actions$.pipe(
        ofType(EmployeeFeatureAction.DeleteRequestConfirmed),
        exhaustMap((action: any) =>
            this._repo.delete(action.payload.id).pipe(
                map(result => ({ type: EmployeeFeatureAction.DeleteRequestPersisted, payload: action.payload })))
        )));

}

