
import { createSelector, createFeatureSelector } from '@ngrx/store'
import { Employee } from 'src/app/employee-feature/lib/Employee';
import { IEmployeeList, IEmployeeSearch } from './state';
import { IForm } from 'src/app/common/IForm';

//EmployeeList
const employeeFeature_ListSelector = createFeatureSelector<IEmployeeList>("EmployeeList")
export const count = createSelector(employeeFeature_ListSelector, (state) => { return state.list.length });
export const list = createSelector(employeeFeature_ListSelector, (state) => { return state.list });
export const filtered = createSelector(employeeFeature_ListSelector, (state) => { return state.listFiltered });
export const actionSheetIsOpen = createSelector(employeeFeature_ListSelector, (state) => { return state.actionSheet.isOpen });
export const actionSheetEntity = createSelector(employeeFeature_ListSelector, (state) => { return state.actionSheet.entity });
export const actionSheetButtons = createSelector(employeeFeature_ListSelector, (state) => { return state.actionSheet.buttons });
export const modalIsOpen = createSelector(employeeFeature_ListSelector, (state) => { return state.modal.isOpen });
export const modalEntity = createSelector(employeeFeature_ListSelector, (state) => { return state.modal.entity });

//Form
const employeeFeature_FormSelector = createFeatureSelector<IForm<Employee>>("EmployeeForm")
export const operation = createSelector(employeeFeature_FormSelector, (state) => state.operation);
export const employee = createSelector(employeeFeature_FormSelector, (state) => state.entity);
export const hasOperation = createSelector(employeeFeature_FormSelector, (state) => employee !== null)
//search
const employeeFeature_SearchSelector = createFeatureSelector<IEmployeeSearch>("EmployeeSearch");
export const debounce = createSelector(employeeFeature_SearchSelector, (state) => { return state.debounce });
export const results = createSelector(employeeFeature_SearchSelector, (state) => { return state.results });
export const noResult = createSelector(employeeFeature_SearchSelector, (state) => { return state.noResult });