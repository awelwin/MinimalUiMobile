
import { createAction, emptyProps, props } from "@ngrx/store"
import { Employee } from "src/app/common/dto/Employee";
import { StoreActionTypes } from "./StoreActionTypes";


//list
export const employeeList_Action = createAction(
    StoreActionTypes.EmployeeList, props<{ employees: Employee[] }>());
export const employeeList_LoadAction = createAction(
    StoreActionTypes.EmployeeList_Load, emptyProps);
export const employeeList_LoadResultAction = createAction(
    StoreActionTypes.EmployeeList_LoadResult, props<{ payload: Employee[] }>());

//delete
export const employeeList_DeleteRequestAction = createAction(
    StoreActionTypes.EmployeeList_DeleteRequest, emptyProps);
export const employeeList_DeleteRequestPersistedAction = createAction(
    StoreActionTypes.EmployeeList_DeleteRequestPersisted, props<{ payload: Employee }>());
export const employeeList_DeleteRequestConfirmedAction = createAction(
    StoreActionTypes.EmployeeList_DeleteRequestConfirmed, props<{ payload: Employee }>());

//filter
export const employeeList_FilterAction = createAction(
    StoreActionTypes.EmployeeList_Filter, props<{ payload: string }>());
export const employeeList_FilterResultAction = createAction(
    StoreActionTypes.EmployeeList_FilterResult, props<{ payload: Employee[] }>());

//ActionSheet
export const employeeList_OpenActionSheetAction = createAction(
    StoreActionTypes.EmployeeList_OpenActionSheet, props<{ payload: Employee }>());
export const employeeList_ActionSheetCloseAction = createAction(
    StoreActionTypes.EmployeeList_ActionSheetClose, emptyProps);

//modal
export const employeeList_ModalDismissAction = createAction(
    StoreActionTypes.EmployeeList_ModalDismiss, emptyProps);

//NOTE: 'createActionGroup' uses convension to produce name of action and thus cannot be used with SVGAnimatedEnumeration.










