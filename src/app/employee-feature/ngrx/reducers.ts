import { createReducer, on } from '@ngrx/store';
import { Employee } from 'src/app/employee-feature/lib/Employee';
import { employeeList_LoadResultAction, employeeList_FilterAction, employeeList_OpenActionSheetAction, employeeList_DeleteRequestAction, employeeList_ActionSheetCloseAction, employeeList_DeleteRequestConfirmedAction, employeeList_DeleteRequestPersistedAction, employeeList_ModalDismissAction, employeeList_EditRequestAction, employeeSearch_Debounce, employeeSearch_DebounceResult, employeeSearch_ResultChosen, employeeSearch_Cancel } from './actions';
import { INITIAL_STATE } from './state';


//EMPLOYEE
export const employeeReducer = createReducer(
    INITIAL_STATE.employee,

);


//LIST
export const employeeListReducer = createReducer(
    INITIAL_STATE.list,

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

//SEARCH
export const employeeSearchReducer = createReducer(INITIAL_STATE.search,
    on(employeeSearch_Debounce, (state, action) => ({
        ...state,
        debounce: action.payload,
    })),
    on(employeeSearch_DebounceResult, (state, action) => ({
        ...state,
        results: action.payload,
        noResult: (action.payload.length < 1 ? true : false)
    })),
    on(employeeSearch_ResultChosen, (state, action) => ({
        debounce: "",
        results: [],
        noResult: false
    })),

    on(employeeSearch_Cancel, (state, action) => ({
        debounce: "",
        results: [],
        noResult: false
    })),

);

//---------------------------------------------------------------

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


