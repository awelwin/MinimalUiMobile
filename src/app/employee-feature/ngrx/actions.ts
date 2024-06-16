
import { createAction, emptyProps, props } from "@ngrx/store"
import { Employee } from "src/app/employee-feature/lib/Employee";
import { EmployeeSearchQueryResult } from "../lib/EmployeeSearchQueryResult";
import { IOperation } from "src/app/employee-feature/ngrx/state"

//Action Types
export enum EmployeeFeatureAction {
    Navigate = '[Navigate]',
    List = '[EmployeeList]',
    Load = '[EmployeeList] load',
    Filter = '[EmployeeList] filter',
    FilterCancel = '[EmployeeList] filterCancel',
    OpenActionSheet = '[EmployeeList] openActionSheet',
    ActionSheetClose = '[EmployeeList] actionSheetClose',
    LoadResult = '[EmployeeList] loadResult',
    EditRequest = '[EmployeeList] editRequest',
    DeleteRequest = '[EmployeeList] deleteRequest',
    DeleteRequestConfirmed = '[EmployeeList] deleteRequestConfirmed',
    DeleteRequestPersisted = '[EmployeeList] deleteRequestPersisted',
    ModalDismiss = '[EmployeeList] modalDismiss',
    FilterResult = '[EmployeeList] filterResult',
    SearchDebounce = '[EmployeeSearch] debounce',
    SearchDebounceResult = '[EmployeeSearch] debounceResult',
    SearchResultChosen = '[EmployeeSearch] resultChosen',
    SearchCancel = '[EmployeeSearch] cancel'
}
//navigate
export const employeeFeature_NavigateAction = createAction(EmployeeFeatureAction.Navigate, props<{ path: string[] }>());

//EmployeeList 
export const employeeList_Action = createAction(EmployeeFeatureAction.List, props<{ employees: Employee[] }>());
export const employeeList_LoadAction = createAction(EmployeeFeatureAction.Load, emptyProps);
export const employeeList_LoadResultAction = createAction(EmployeeFeatureAction.LoadResult, props<{ payload: Employee[] }>());

//EmployeeList delete
export const employeeList_DeleteRequestAction = createAction(EmployeeFeatureAction.DeleteRequest, emptyProps);
export const employeeList_DeleteRequestPersistedAction = createAction(EmployeeFeatureAction.DeleteRequestPersisted, props<{ payload: Employee }>());
export const employeeList_DeleteRequestConfirmedAction = createAction(EmployeeFeatureAction.DeleteRequestConfirmed, props<{ payload: Employee }>());

//EmployeeList edit
export const employeeList_EditRequestAction = createAction(EmployeeFeatureAction.EditRequest, props<{ payload: Employee }>());

//EmployeeList filter
export const employeeList_FilterAction = createAction(EmployeeFeatureAction.Filter, props<{ payload: string }>());
export const employeeList_FilterResultAction = createAction(EmployeeFeatureAction.FilterResult, props<{ payload: Employee[] }>());

//EmployeeList ActionSheet
export const employeeList_OpenActionSheetAction = createAction(EmployeeFeatureAction.OpenActionSheet, props<{ payload: Employee }>());
export const employeeList_ActionSheetCloseAction = createAction(EmployeeFeatureAction.ActionSheetClose, emptyProps);

//EmployeeList modal
export const employeeList_ModalDismissAction = createAction(EmployeeFeatureAction.ModalDismiss, emptyProps);

//search
export const employeeSearch_Debounce = createAction(EmployeeFeatureAction.SearchDebounce, props<{ payload: string }>())
export const employeeSearch_DebounceResult = createAction(EmployeeFeatureAction.SearchDebounceResult, props<{ payload: EmployeeSearchQueryResult[] }>())
export const employeeSearch_ResultChosen = createAction(EmployeeFeatureAction.SearchResultChosen, props<{ payload: number }>());
export const employeeSearch_Cancel = createAction(EmployeeFeatureAction.SearchCancel, emptyProps);

//NOTE: 'createActionGroup' uses convension to produce name of action and thus cannot be used with SVGAnimatedEnumeration.










