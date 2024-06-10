
import { Employee } from "src/app/employee-feature/lib/Employee";
import { EmployeeSearchQueryResult } from "src/app/employee-feature/lib/EmployeeSearchQueryResult";
import { IEntity } from "src/app/employee-feature/lib/IEntity";
import { RouterReducerState } from '@ngrx/router-store';

export interface IActionSheet<T extends IEntity> {
    isOpen: boolean,
    entity: T
}
export interface IModal<T extends IEntity> {
    isOpen: boolean,
    entity: T
}

export interface IEmployeeList {
    list: Employee[];
    listFiltered: Employee[];
    actionSheet: IActionSheet<Employee>
    modal: IModal<Employee>
}
export interface IEmployeeSearch {
    debounce: string;
    results: EmployeeSearchQueryResult[];
    noResult: boolean;
}
export interface IEmployeeFeatureState {
    router: RouterReducerState;
    list: IEmployeeList;
    search: IEmployeeSearch;
    employee: Employee;
}

export const INITIAL_STATE: IEmployeeFeatureState = {

    router: null!,
    list:
    {
        list: [],
        listFiltered: [],
        actionSheet: { isOpen: false, entity: null! },
        modal: { isOpen: false, entity: null! }
    },
    search: {
        debounce: "",
        results: [],
        noResult: false
    },
    employee: null!
}