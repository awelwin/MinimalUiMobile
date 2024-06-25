import { createReducer, on } from '@ngrx/store';
import { Employee } from 'src/app/employee-feature/lib/Employee';
import { employeeList_LoadResultAction, employeeList_FilterAction, employeeList_OpenActionSheetAction, employeeList_DeleteRequestAction, employeeList_ActionSheetCloseAction, employeeList_DeleteRequestConfirmedAction, employeeList_DeleteRequestPersistedAction, employeeList_ModalDismissAction, employeeSearch_Debounce, employeeSearch_DebounceResult, employeeSearch_ResultChosen, employeeSearch_Cancel, employeeForm_editRequestPersistedAction, employeeForm_editRequestAction } from './actions';
import { INITIAL_STATE } from './state';
import { EntityOperation } from '../../common/EntityOperation';
import { FormUtils } from '../../common/utils/FormUtils';
import { IActionSheetButton } from 'src/app/common/ionic/IActionSheetButton';
import { IForm } from 'src/app/common/IForm';


//LIST SLICE
export const employeeListReducer = createReducer(
    INITIAL_STATE.list,

    //
    on(employeeList_LoadResultAction, (state, action) => ({
        ...state,
        list: action.payload,
        listFiltered: action.payload
    })),

    on(employeeList_DeleteRequestAction, (state, action) => ({
        ...state,
        modal: {
            isOpen: true,
            entity: state.actionSheet.entity
        },
        actionSheet: { ...state.actionSheet, isOpen: false }
    })),

    on(employeeList_ModalDismissAction,
        employeeList_DeleteRequestConfirmedAction, (state, action) => ({
            ...state,
            modal: { ...state.modal, isOpen: false }
        })),
    on(employeeList_DeleteRequestPersistedAction, (state, action) =>
    ({
        ...state,
        list: FormUtils.deleteEntity<Employee>(state.list, action.payload.id),
        listFiltered: FormUtils.deleteEntity<Employee>(state.listFiltered, action.payload.id)
    })),

    on(employeeForm_editRequestAction, (state, action) => ({
        ...state,
        actionSheet: { ...state.actionSheet, isOpen: false }
    })),

    on(employeeForm_editRequestPersistedAction, (state, action) =>
    ({
        ...state,
        list: FormUtils.updateEntity<Employee>(state.list, action.payload),
        listFiltered: FormUtils.updateEntity<Employee>(state.listFiltered, action.payload)
    })),

    on(employeeList_FilterAction, (state, filter) => ({
        ...state,
        list: state.list,
        listFiltered: filterList(state.list, filter.payload)
    })),

    //action-sheet
    on(employeeList_ActionSheetCloseAction, (state, action) => {
        return {
            ...state,
            actionSheet: { ...state.actionSheet, isOpen: false }
        }
    }),

    on(employeeList_OpenActionSheetAction, (state, action) => {
        let updatedButtons = state.actionSheet.buttons.map(x => ({
            ...x, data: { ...x.data, entity: action.payload } // <--employee
        })) as IActionSheetButton<IForm<Employee>>[];

        return {
            ...state,
            actionSheet: { isOpen: true, entity: action.payload, buttons: updatedButtons }
        }
    }),
);

//SEARCH SLICE
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

//Form SLICE
export const employeeFormReducer = createReducer(
    INITIAL_STATE.form,

    on(employeeForm_editRequestAction, (state, action) => ({
        entity: action.payload,
        operation: EntityOperation.Update
    })),
);

//---------------------------------------------------------------

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


