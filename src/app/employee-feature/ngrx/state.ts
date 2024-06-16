
import { Employee } from "src/app/employee-feature/lib/Employee";
import { EmployeeSearchQueryResult } from "src/app/employee-feature/lib/EmployeeSearchQueryResult";
import { IEntity } from "src/app/employee-feature/lib/IEntity";
import { RouterReducerState } from '@ngrx/router-store';
import { EntityOperation } from "../lib/EntityOperation";
import { TaxFileRecord } from "../lib/TaxFileRecord";

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
export interface IEmployeeForm {
    operation: EntityOperation;
    valid: boolean;
    ageValid: boolean;
    firstnameValid: boolean;
    lastnameValid: boolean;
    aliasValid: boolean;
    actionSheet: IActionSheet<TaxFileRecord>;
    modal: IModal<TaxFileRecord>;
}

export interface IOperation<T extends IEntity> {
    operation: EntityOperation;
    entity: T;
}
export interface IEmployeeFeatureState {
    router: RouterReducerState;
    list: IEmployeeList;
    search: IEmployeeSearch;
    operation: IOperation<Employee>;
    form: IEmployeeForm
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

    operation:
    {
        operation: EntityOperation.Update,
        entity: {
            id: 1,
            firstname: 'first1',
            lastname: 'last1',
            age: 29,
            resourceName: '',
            created: new Date(),
            updated: new Date(),
            taxFile: {
                id: 1, employeeId: 1, alias: 'alias1', resourceName: '', created: new Date(), updated: new Date(),
                taxFileRecords: [
                    { resourceName: '', id: 1, taxFileId: 1, financialYear: 1209, amountClaimed: 55, amountPaid: 88, created: new Date(), updated: new Date() },
                    { resourceName: '', id: 2, taxFileId: 1, financialYear: 1999, amountClaimed: 44, amountPaid: 108, created: new Date(), updated: new Date() }
                ]
            }
        }
    },
    form: {
        operation: null!,
        valid: true,
        ageValid: true,
        firstnameValid: true,
        lastnameValid: true,
        aliasValid: true,
        actionSheet: { isOpen: false, entity: null! },
        modal: { isOpen: false, entity: null! }
    }
}


