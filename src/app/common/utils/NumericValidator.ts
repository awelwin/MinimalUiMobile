import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function NumericValidator(control: AbstractControl): ValidationErrors | null {
    const isNumber = typeof +control.value === "number" && !isNaN(+control.value);
    return isNumber ? null : { numeric: { value: 'must be a number' } }

}