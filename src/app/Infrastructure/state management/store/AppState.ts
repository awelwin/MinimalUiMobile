
import { IActionSheetButton } from "src/app/common/IActionSheetButton";
import { Employee } from "src/app/common/dto/Employee";
import { EmployeeSearchQueryResult } from "src/app/common/dto/EmployeeSearchQueryResult";
import { IEntity } from "src/app/common/dto/IEntity";

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

export interface IAppState {
    EmployeeList: IEmployeeList;
    EmployeeSearchResults: EmployeeSearchQueryResult[];
}
export const INITIAL_APP_STATE: IAppState = {
    EmployeeList:
    {
        list: [],
        listFiltered: [],
        actionSheet: { isOpen: false, entity: null! },
        modal: { isOpen: false, entity: null! }
    },
    EmployeeSearchResults: []
}