import { AbstractControl, FormControlStatus } from "@angular/forms"
import { Observable, map, startWith } from "rxjs";

export abstract class FormUtils {
    constructor() { }
    /**
     * isControlValid()
     * Determine validity of a form control beond its validators to consider user interactions
     * @param control abstract control
     */
    public static isControlValid(control: AbstractControl): boolean {
        return control.errors === null && (control.pristine || control.dirty);
    }

    /**
     * getControlStatus()
     * @param control 
     * @returns AbstractControlStatus simplified to true false
     */
    public static isControlValidAsync(control: AbstractControl): Observable<boolean> {
        return control.statusChanges
            .pipe(
                map<FormControlStatus, boolean>(
                    status => status === 'INVALID' ? false : true
                ),
                startWith(true));
    }

}
