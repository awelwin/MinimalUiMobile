import { EntityOperation } from "src/app/employee-feature/lib/EntityOperation";
import { TaxFileRecord } from "src/app/employee-feature/lib/TaxFileRecord";
import { IActionSheet, IModal } from "src/app/employee-feature/ngrx/state";
import { ComponentStore }
export interface IEmployeeFormState {
    operation: EntityOperation;
    valid: boolean;
    ageValid: boolean;
    firstnameValid: boolean;
    lastnameValid: boolean;
    aliasValid: boolean;
    actionSheet: IActionSheet<TaxFileRecord>;
    modal: IModal<TaxFileRecord>;
}

export class EmployeeFormStore extends ComponentStore<IEmployeeFormState>


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