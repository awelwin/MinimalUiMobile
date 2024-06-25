
import { Employee } from "src/app/employee-feature/lib/Employee";
import { EmployeeSearchQueryResult } from "src/app/employee-feature/lib/EmployeeSearchQueryResult";
import { RouterReducerState } from '@ngrx/router-store';
import { EntityOperation } from "../../common/EntityOperation";
import { IModal } from "src/app/common/ionic/IModal";
import { IActionSheet } from "src/app/common/ionic/IActionsheet";
import { IEntity } from "src/app/common/IEntity";

export interface IEmployeeList {
    list: Employee[];
    listFiltered: Employee[];
    actionSheet: IActionSheet<Employee>;
    modal: IModal<Employee>;
}
export interface IEmployeeSearch {
    debounce: string;
    results: EmployeeSearchQueryResult[];
    noResult: boolean;
}

export interface ITaxfileForm {
    id: number
    employeeId: number;
    alias: string;
}

export interface IForm<T extends IEntity> {
    operation: EntityOperation;
    entity: T;
}

export interface IEmployeeFeatureState {
    router: RouterReducerState;
    list: IEmployeeList;
    search: IEmployeeSearch;
    form: IForm<Employee>;

}

export const INITIAL_STATE: IEmployeeFeatureState = {

    router: null!,
    list:
    {
        list: [],
        listFiltered: [],
        actionSheet: {
            isOpen: false,
            entity: null!,
            buttons: [
                { text: "delete", cssClass: "action-sheet-button-delete", data: { operation: EntityOperation.DeleteRequest, entity: null! } },
                { text: "edit", cssClass: "action-sheet-button-default", data: { operation: EntityOperation.Update, entity: null! } },
                { text: "cancel", cssClass: "action-sheet-button-default", data: { operation: null!, entity: null! } }
            ]
        },
        modal: { isOpen: false, entity: null! }
    },
    search: {
        debounce: "",
        results: [],
        noResult: false
    },

    form:
    {
        operation: EntityOperation.Update,
        entity: null!,
    }
}


