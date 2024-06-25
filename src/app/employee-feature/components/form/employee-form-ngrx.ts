import { ComponentStore } from "@ngrx/component-store";
import { Observable, map, tap } from "rxjs";
import { TaxFileRecord } from "src/app/employee-feature/lib/TaxFileRecord";
import { FormUtils } from "src/app/common/utils/FormUtils";
import { IModal } from "src/app/common/ionic/IModal";
import { IActionSheet } from "src/app/common/ionic/IActionsheet";
import { Employee } from "src/app/employee-feature/lib/Employee";
import { EntityOperation } from "src/app/common/EntityOperation";
import { FormBuilder } from "@angular/forms";
import { Injectable } from "@angular/core";
import { IEmployeeFeatureState } from "src/app/employee-feature/ngrx/state";
import { Store } from "@ngrx/store";
import { EmployeeFeatureAction } from "src/app/employee-feature/ngrx/actions";

export interface IEmployeeFormState {

    tfrOperation: EntityOperation;
    valid: boolean;
    ageValid: boolean;
    firstnameValid: boolean;
    lastnameValid: boolean;
    aliasValid: boolean;
    actionSheet: IActionSheet<TaxFileRecord>;
    modal: IModal<TaxFileRecord>;
    employee: Employee;
    submitted: boolean;
}

const INITIAL_STATE =
    {
        tfrOperation: null!,
        valid: true, ageValid: true, firstnameValid: true, lastnameValid: true, aliasValid: true,
        actionSheet: {
            isOpen: false, entity: null!, buttons: [
                { text: "delete", cssClass: "action-sheet-button-delete", data: { operation: EntityOperation.Delete, entity: null! } },
                { text: "edit", cssClass: "action-sheet-button-default", data: { operation: EntityOperation.Update, entity: null! } },
                { text: "cancel", cssClass: "action-sheet-button-default", data: { operation: null!, entity: null! } }
            ]
        },
        modal: { isOpen: false, entity: null! },
        employee: null!,
        submitted: false
    } as IEmployeeFormState

@Injectable()
export class EmployeeFormStore extends ComponentStore<IEmployeeFormState> {

    constructor(
        private fb: FormBuilder,
        private globalStore: Store<IEmployeeFeatureState>
    ) {
        super(INITIAL_STATE);

    }
    /*
    * SELECTORS ---------------------
    */
    readonly selectTaxFileRecords$ = this.select(state => state.employee.taxFile.taxFileRecords);
    readonly selectEmployee$ = this.select(state => state.employee);

    //validation
    readonly selectValid$ = this.select(state => state.valid);
    readonly selectSubmitted = this.select(state => state.submitted);
    readonly selectAgeValid$ = this.select(state => state.ageValid);
    readonly selectFirstnameValid$ = this.select(state => state.firstnameValid);
    readonly selectLastnameValid$ = this.select(state => state.lastnameValid);
    readonly selectAliasValid$ = this.select(state => state.aliasValid);

    //menu
    readonly selectActionSheet$ = this.select(state => state.actionSheet);
    readonly selectActionSheetIsOpen$ = this.select(this.selectActionSheet$, (as) => as.isOpen);
    readonly selectActionSheetEntity$ = this.select(this.selectActionSheet$, (as) => as.entity);
    readonly selectActionSheetButtons$ = this.select(this.selectActionSheet$, (as) => as.buttons);

    readonly selectModal$ = this.select(state => state.modal);
    readonly selectModalIsOpen$ = this.select(state => state.modal.isOpen);
    readonly selectTfrOperation = this.select(state => state.tfrOperation);

    /*
     * UPDATORS -----------------------
     */
    readonly updateEmployee = this.updater((state, val: any) => ({
        ...state,
        employee: val
    }));

    readonly updatePatchEmployee = this.updater((state, val: any) => ({
        ...state,
        submitted: true,
        employee: {
            ...state.employee,
            firstname: val.firstname,
            lastname: val.lastname,
            age: val.age,
            taxFile: {
                ...state.employee.taxFile,
                alias: val.taxFile.alias
            }
        }
    }));

    //validation
    readonly updateValid = this.updater((state, val: boolean) => ({ ...state, valid: val }));
    readonly updateAgeValid = this.updater((state, val: boolean) => ({ ...state, ageValid: val }));
    readonly updateFirstnameValid = this.updater((state, val: boolean) => ({ ...state, firstnameValid: val }));
    readonly updateLastnameValid = this.updater((state, val: boolean) => ({ ...state, lastnameValid: val }));
    readonly updateAliasValid = this.updater((state, val: boolean) => ({ ...state, aliasValid: val }));

    //Tax File Records
    readonly updateTfrOperation = this.updater((state, val: EntityOperation) => ({ ...state, tfrOperation: val }));
    readonly updateTaxFileRecords = this.updater((state, val: TaxFileRecord[]) => ({ ...state, taxFileRecords: val }));
    readonly updateTfrDelete = this.updater((state) => {
        return {
            ...state,
            employee: {
                ...state.employee,
                taxFile: {
                    ...state.employee.taxFile,
                    taxFileRecords: FormUtils.deleteEntity<TaxFileRecord>(state.employee.taxFile.taxFileRecords, state.actionSheet.entity.id)
                }
            }
        };
    });
    readonly updateTfrUpdateRequest = this.updater((state) => ({ ...state, tfrOperation: EntityOperation.Update, modal: { isOpen: true, entity: state.actionSheet.entity } }));
    readonly updateTfrAddRequest = this.updater((state, val: TaxFileRecord) => (
        {
            ...state,
            tfrOperation: EntityOperation.Create,
            modal: { isOpen: true, entity: val },
            actionSheet: {
                ...state.actionSheet,
                isOpen: false,
                entity: {
                    ...val,
                    taxFileId: state.employee.taxFile.id //preload empty tfr record with id from employee taxfile
                }
            }
        }));
    readonly updateTfrConfirm = this.updater((state, val: TaxFileRecord) => {
        switch (state.tfrOperation) {
            case EntityOperation.Update:
                let updated = [...state.employee.taxFile.taxFileRecords];
                updated[state.employee.taxFile.taxFileRecords.findIndex(x => x.id === val.id)] = val;
                return { ...state, employee: { ...state.employee, taxFile: { ...state.employee.taxFile, taxFileRecords: updated } }, modal: { ...state.modal, isOpen: false } }
            case EntityOperation.Create:
                return { ...state, employee: { ...state.employee, taxFile: { ...state.employee.taxFile, taxFileRecords: [...state.employee.taxFile.taxFileRecords, val] } }, modal: { ...state.modal, isOpen: false } };
            default: return { ...state }
        }
    });


    //Menu
    readonly updateModalClosed = this.updater((state) => ({ ...state, modal: { ...state.modal, isOpen: false } }));
    readonly updateActionSheetClosed = this.updater((state) => ({ ...state, actionSheet: { ...state.actionSheet, isOpen: false } }));
    readonly updateActionSheetOpen = this.updater((state, val: TaxFileRecord) => ({ ...state, actionSheet: { ...state.actionSheet, isOpen: true, entity: val } }));


    /*
       * EFFECTS ---------------------
       */
    readonly effectEditRequestConfirmed = this.effect((emp$: Observable<Employee>) => {
        return emp$.pipe(
            tap(e => {
                //inform global state via ngrx event  
                this.globalStore.dispatch({ type: EmployeeFeatureAction.EditRequestConfirmed, payload: e })
            })
        )
    });
}
