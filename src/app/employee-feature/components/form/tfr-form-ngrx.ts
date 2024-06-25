import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

export interface ITaxFileRecordFormState {

    valid: boolean;
    financialYearValid: boolean;
    amountPaidValid: boolean;
    amountClaimedValid: boolean;
}

const INITIAL_STATE =
    {
        valid: true,
        financialYearValid: true, amountPaidValid: true, amountClaimedValid: true
    } as ITaxFileRecordFormState

@Injectable()
export class TaxFileRecordFormStore extends ComponentStore<ITaxFileRecordFormState> {

    constructor() {
        super(INITIAL_STATE)
    }
    /*
    * SELECTORS
    */
    readonly valid$ = this.select(state => state.valid);
    readonly financialYearValid$ = this.select(state => state.financialYearValid);
    readonly amountPaidValid$ = this.select(state => state.amountPaidValid);
    readonly amountClaimedValid$ = this.select(state => state.amountClaimedValid);
    /*
     * UPDATORS
     */
    readonly setValid = this.updater((state, val: boolean) => ({ ...state, valid: val }));
    readonly setFinancialYearValid = this.updater((state, val: boolean) => ({ ...state, financialYearValid: val }));
    readonly setAmountPaidValid = this.updater((state, val: boolean) => ({ ...state, amountPaidValid: val }));
    readonly setAmountClaimedValid = this.updater((state, val: boolean) => ({ ...state, amountClaimedValid: val }));
    /*
       * EFFECTS
       */
}
