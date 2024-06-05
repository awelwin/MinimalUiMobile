import { createReducer, on } from '@ngrx/store';
import { Employee } from 'src/app/common/dto/Employee';
import { employeeList_LoadResultAction, employeeList_FilterAction, employeeList_OpenActionSheetAction, employeeList_DeleteRequestAction, employeeList_ActionSheetCloseAction, employeeList_DeleteRequestConfirmedAction, employeeList_DeleteRequestPersistedAction, employeeList_ModalDismissAction } from './StoreActions';
import { INITIAL_APP_STATE } from './AppState';

/**
 * REDUCER for Emplmoyee-List slice
 */

const initialState = INITIAL_APP_STATE.EmployeeList;

export const EmployeeListReducer = createReducer(
    initialState,

    //load
    on(employeeList_LoadResultAction, (state, action) => ({
        ...state,
        list: action.payload,
        listFiltered: action.payload
    })),

    //delete
    on(employeeList_DeleteRequestAction, (state, action) => ({
        ...state,
        modal: {
            isOpen: true,
            entity: state.actionSheet.entity
        }
    })),
    on(employeeList_ModalDismissAction,
        employeeList_DeleteRequestConfirmedAction, (state, action) => ({
            ...state,
            modal: { ...state.modal, isOpen: false }
        })),
    on(employeeList_DeleteRequestPersistedAction, (state, action) =>
    ({
        ...state,
        list: deleteEmployee(state.list, action.payload.id),
        listFiltered: deleteEmployee(state.listFiltered, action.payload.id)
    })),

    //filter
    on(employeeList_FilterAction, (state, filter) => ({
        ...state,
        list: state.list,
        listFiltered: filterList(state.list, filter.payload)
    })),

    //action-sheet
    on(employeeList_ActionSheetCloseAction, (state, action) => ({
        ...state,
        actionSheet: {
            ...state.actionSheet,
            isOpen: false
        }
    })),
    on(employeeList_OpenActionSheetAction, (state, action) => ({
        ...state,
        actionSheet: {
            isOpen: true,
            entity: action.payload
        }
    })),
);

/*
Delete Employee
 */
function deleteEmployee(list: Employee[], id: number): Employee[] {
    if (list == null)
        return [];

    let newList: Employee[] = [...list];

    let index: number = list.findIndex(x => x.id == id);
    if (index > -1)
        newList.splice(index, 1);

    return newList;
}

/*
Filter list
 */
function filterList(list: any[] | null, value: string) {

    //validate params
    if (value == "")
        return list!;

    if (list == null)
        return [];

    //search using json string
    let _results: Employee[] = [];
    let _value = ""
    _results = list.filter(
        (e) => JSON.stringify({ id: e.id, firstname: e.firstname, lastname: e.lastname })
            .toLowerCase()
            .includes(value.toLowerCase()));

    return _results;
}


