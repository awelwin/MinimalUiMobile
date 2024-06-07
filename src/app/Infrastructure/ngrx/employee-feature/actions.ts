
import { createAction, emptyProps, props } from "@ngrx/store"
import { Employee } from "src/app/common/dto/Employee";

//Action Types
export enum EmployeeFeatureAction {
    List = '[EmployeeList]',
    Load = '[EmployeeList] load',
    Filter = '[EmployeeList] filter',
    FilterCancel = '[EmployeeList] filterCancel',
    OpenActionSheet = '[EmployeeList] openActionSheet',
    LoadResult = '[EmployeeList] loadResult',
    EditRequest = '[EmployeeList] editRequest',
    DeleteRequest = '[EmployeeList] deleteRequest',
    DeleteRequestConfirmed = '[EmployeeList] deleteRequestConfirmed',
    DeleteRequestPersisted = '[EmployeeList] deleteRequestPersisted',
    ModalDismiss = '[EmployeeList] modalDismiss',
    FilterResult = '[EmployeeList] filterResult',
    ActionSheetClose = '[EmployeeList] actionSheetClose',
}

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


//NOTE: 'createActionGroup' uses convension to produce name of action and thus cannot be used with SVGAnimatedEnumeration.










