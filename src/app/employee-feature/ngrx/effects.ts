import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RepositoryServiceFactory } from '../../common/service/RepositoryServiceFactory'
import { RepositoryService } from '../../common/service/RepositoryService';
import { Employee } from '../lib/Employee';
import { exhaustMap, map, switchMap, tap, EMPTY, of, observable, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { EmployeeFeatureAction, employeeFeature_NavigateAction, employeeSearch_Debounce, employeeSearch_DebounceResult, employeeSearch_ResultChosen } from './actions';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/common/service/QueryService';

@Injectable()
export class EmployeeListEffects {

    _repo: RepositoryService<Employee>;

    constructor(
        private repoFactory: RepositoryServiceFactory,
        private actions$: Actions,
        private router: Router,
        private queryService: QueryService) {
        this._repo = repoFactory.getInstance<Employee>(Employee);
    }

    //navigate
    EmployeeFeatureNavigate = createEffect(() => this.actions$.pipe(
        ofType(employeeFeature_NavigateAction),
        tap(action => { this.router.navigate(action.path) }),
    ),
        { dispatch: false }
    );

    //EMPLOYEE
    employeeList_EditRequest$ = createEffect(() => this.actions$.pipe(
        ofType(EmployeeFeatureAction.EditRequest),
        tap(() => this.router.navigate(['employee-feature/employee']))
    ),
        { dispatch: false }
    );

    //LIST
    // Load -> loadResult
    EmployeeListLoad$ = createEffect(() => this.actions$.pipe(
        ofType(EmployeeFeatureAction.Load),
        exhaustMap(() => this._repo.get().pipe(
            map(result => ({ type: EmployeeFeatureAction.LoadResult, payload: result }))
        ))));


    // deleteRequestConfirmed -> deleteRequestPersisted
    employeeList_DeleteRequestConfirmed$ = createEffect(() => this.actions$.pipe(
        ofType(EmployeeFeatureAction.DeleteRequestConfirmed),
        exhaustMap((action: any) => {
            return this._repo.delete(action.payload.id).pipe(
                map(result => ({ type: EmployeeFeatureAction.DeleteRequestPersisted, payload: action.payload })))
        }
        )));

    //SEARCH
    //debounce -> debounceResult
    employeeSearch_Debounce$ = createEffect(() => this.actions$.pipe(
        ofType(employeeSearch_Debounce),
        exhaustMap((action) =>
            this.queryService.searchEmployee(action.payload).pipe(map(result => ({ type: EmployeeFeatureAction.SearchDebounceResult, payload: result })))
        )));


    //resultChosen
    employeeSearch_ResultChosen$ = createEffect(() => this.actions$.pipe(
        ofType(employeeSearch_ResultChosen),
        tap(action => { this.router.navigate([`/employee-feature/employee/${action.payload}`]) }),
    ),
        { dispatch: false }
    );

}

