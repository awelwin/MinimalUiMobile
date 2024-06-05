
import { createSelector, createFeatureSelector } from '@ngrx/store'
import { IEmployeeList } from './AppState';

const list = createFeatureSelector<IEmployeeList>("EmployeeList")
export const selectEmployeeList_Count = createSelector(list, (state) => { return state.list.length });
export const selectEmployeeList = createSelector(list, (state) => { return state.list });
export const selectEmployeeList_Filtered = createSelector(list, (state) => { return state.listFiltered });
export const selectEmployeeList_ActionSheetIsOpen = createSelector(list, (state) => { return state.actionSheet.isOpen });
export const selectEmployeeList_ActionSheetEntity = createSelector(list, (state) => { return state.actionSheet.entity });
export const selectEmployeeList_ModalIsOpen = createSelector(list, (state) => { return state.modal.isOpen });
export const selectEmployeeList_ModalEntity = createSelector(list, (state) => { return state.modal.entity });



