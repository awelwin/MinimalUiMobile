
import { createSelector, createFeatureSelector } from '@ngrx/store'
import { Employee } from 'src/app/employee-feature/lib/Employee';
import { IEmployeeList } from './state';

//EmployeeList
const employeeFeature_ListSelector = createFeatureSelector<IEmployeeList>("EmployeeList")
export const count = createSelector(employeeFeature_ListSelector, (state) => { return state.list.length });
export const list = createSelector(employeeFeature_ListSelector, (state) => { return state.list });
export const filtered = createSelector(employeeFeature_ListSelector, (state) => { return state.listFiltered });
export const actionSheetIsOpen = createSelector(employeeFeature_ListSelector, (state) => { return state.actionSheet.isOpen });
export const actionSheetEntity = createSelector(employeeFeature_ListSelector, (state) => { return state.actionSheet.entity });
export const modalIsOpen = createSelector(employeeFeature_ListSelector, (state) => { return state.modal.isOpen });
export const modalEntity = createSelector(employeeFeature_ListSelector, (state) => { return state.modal.entity });

//Employee
const employeeFeature_EmployeeSelector = createFeatureSelector<Employee>("Employee")
export const employee = createSelector(employeeFeature_EmployeeSelector, (state) => state);

