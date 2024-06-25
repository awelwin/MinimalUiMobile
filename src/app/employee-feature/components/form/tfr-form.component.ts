import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaxFileRecord } from 'src/app/employee-feature/lib/TaxFileRecord';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaxFileRecordFormStore } from './tfr-form-ngrx';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { IonItemDivider, IonList, IonItemGroup, IonButton } from "@ionic/angular/standalone";
import { NumericValidator } from 'src/app/common/utils/NumericValidator';
import { FormUtils } from 'src/app/common/utils/FormUtils';
import { IModalComponent } from 'src/app/common/ionic/IModalComponent';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'tfr-form',
  templateUrl: './tfr-form.component.html',
  styleUrls: [],
  standalone: true,
  imports: [IonButton, IonItemGroup, IonList, IonItemDivider, ReactiveFormsModule, NgClass, AsyncPipe],
  providers: [TaxFileRecordFormStore, NgIf]
})
export class TfrFormComponent implements IModalComponent {

  @Input("entity") t: TaxFileRecord = null!;
  @Output("confirm") confirmEmitter = new EventEmitter<TaxFileRecord>();
  @Output('cancel') cancelEmitter = new EventEmitter<any>();

  _FORM: FormGroup = null!;
  _store: TaxFileRecordFormStore = null!;

  constructor(
    private fb: FormBuilder,
    store: TaxFileRecordFormStore,
    modalCtrl: ModalController) {
    this._store = store;
  }

  ngOnInit() {

    this._FORM = this.fb.group({
      id: this.t.id,
      taxfileId: this.t.taxFileId,
      resourceName: '',
      financialYear: [this.t.financialYear, [Validators.required, NumericValidator]],
      amountPaid: [this.t.amountPaid, [Validators.required, NumericValidator]],
      amountClaimed: [this.t.amountClaimed, [Validators.required, NumericValidator]],
      created: this.t.created,
      updated: this.t.updated
    })

    // Local State - Validation
    this._store.setFinancialYearValid(FormUtils.isControlValidAsync(this._FORM.controls['financialYear']));
    this._store.setAmountPaidValid(FormUtils.isControlValidAsync(this._FORM.controls['amountPaid']));
    this._store.setAmountClaimedValid(FormUtils.isControlValidAsync(this._FORM.controls['amountClaimed']));
    this._store.setValid(FormUtils.isControlValidAsync(this._FORM));

  }

  confirm() {
    this.confirmEmitter.emit(this._FORM.getRawValue() as TaxFileRecord)
  }
  cancel() {
    this.cancelEmitter.emit();
  }
}
