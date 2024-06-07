
import { Employee } from "src/app/common/dto/Employee";
import { EmployeeSearchQueryResult } from "src/app/common/dto/EmployeeSearchQueryResult";
import { IEntity } from "src/app/common/dto/IEntity";
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
export interface IEmployeeFeature {
    list: IEmployeeList;
    searchResults: EmployeeSearchQueryResult[];
}

export interface IAppState {
    router: RouterReducerState;
    employeeFeature: IEmployeeFeature;

}
export const INITIAL_APP_STATE: IAppState = {
    router: null!,
    employeeFeature:
    {
        list:
        {
            list: [],
            listFiltered: [],
            actionSheet: { isOpen: false, entity: null! },
            modal: { isOpen: false, entity: null! }
        },
        searchResults: []
    }
}