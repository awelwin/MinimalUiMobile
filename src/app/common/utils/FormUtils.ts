import { AbstractControl, FormControlStatus } from "@angular/forms"
import { Observable, map, startWith } from "rxjs";
import { IEntity } from "src/app/common/IEntity";

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
                    status => (control.valid) || (!control.valid && control.pristine)
                ),
                startWith(true));
    }

    /*
    deleteEntity()
    Delete entity from array with given id
     */
    public static deleteEntity<T extends IEntity>(list: T[], id: number): T[] {
        if (list == null)
            return [];

        let newList: T[] = [...list];

        let index: number = list.findIndex(x => x.id == id);
        if (index > -1)
            newList.splice(index, 1);

        return newList;
    }

    public static updateEntity<T extends IEntity>(list: T[], entity: T): T[] {
        let updated = [...list];
        let index = list.findIndex(x => x.id === entity.id);
        if (index > -1)
            updated[index] = entity;

        return updated;
    }
}



