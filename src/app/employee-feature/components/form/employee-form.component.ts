import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumericValidator } from 'src/app/common/utils/NumericValidator';
import { FormUtils } from 'src/app/common/utils/FormUtils';
import { Observable, map } from 'rxjs';
import { EntityOperation } from 'src/app/common/EntityOperation';
import { ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonActionSheet, IonItemGroup, IonItemDivider, IonLabel, IonItem, IonList, IonIcon, IonModal, IonContent } from "@ionic/angular/standalone";
import { TaxFileRecord } from 'src/app/employee-feature/lib/TaxFileRecord';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { IActionSheetButton } from 'src/app/common/ionic/IActionSheetButton';
import { addIcons } from 'ionicons';
import { EmployeeFormStore } from './employee-form-ngrx';
import { ellipsisVerticalOutline, add } from 'ionicons/icons';
import { TfrFormComponent } from './tfr-form.component';
import { IEmployeeFeatureState } from 'src/app/employee-feature/ngrx/state';
import { Store } from '@ngrx/store';
import { employee } from 'src/app/employee-feature/ngrx/selectors';

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: [],
  standalone: true,
  imports: [NgIf, IonContent, IonModal, IonIcon, IonList, IonItem, IonLabel, IonItemDivider, IonItemGroup, IonActionSheet, IonButton, AsyncPipe, ReactiveFormsModule, NgFor, DatePipe, NgClass, TfrFormComponent],
  providers: [EmployeeFormStore,]
})
export class EmployeeFormComponent implements OnInit {

  _FORM$: Observable<FormGroup> = null!;
  _actionSheetButtons$: Observable<IActionSheetButton[]> = null!;
  _store: EmployeeFormStore = null!;

  constructor(private fb: FormBuilder,
    private globalStore: Store<IEmployeeFeatureState>,
    store: EmployeeFormStore
  ) {
    addIcons({ ellipsisVerticalOutline, add })
    this._store = store;
  }

  ngOnInit() {

    //set initial local state
    this._store.updateEmployee(this.globalStore.select(employee));
    this._actionSheetButtons$ = this._store.selectActionSheetButtons$;

    //set initial Form state
    this._FORM$ = this._store.selectEmployee$.pipe(
      map(e => {
        let fg = this.fb.group({
          firstname: [e.firstname, [Validators.required, Validators.maxLength(50)]],
          lastname: [e.lastname, [Validators.required, Validators.maxLength(50)]],
          age: [e.age, NumericValidator],
          taxFile: this.fb.group({
            alias: [e.taxFile.alias, Validators.required],
          })
        });
        //wireup validation event listeners
        this._store.updateFirstnameValid(FormUtils.isControlValidAsync(fg.controls['firstname']));
        this._store.updateLastnameValid(FormUtils.isControlValidAsync(fg.controls['lastname']));
        this._store.updateAgeValid(FormUtils.isControlValidAsync(fg.controls['age']));
        this._store.updateAliasValid(FormUtils.isControlValidAsync(fg.get('taxFile.alias')!));
        this._store.updateValid(FormUtils.isControlValidAsync(fg));
        return fg;
      }));
  }
  tfrAddRequest(): void {

    //blank entity
    let tfr = {
      id: null!,
      taxFileId: null!,
      financialYear: null!,
      amountPaid: null!,
      amountClaimed: null!,
      created: new Date(),
      updated: new Date(),
      resourceName: ""
    } as TaxFileRecord;
    this._store.updateTfrAddRequest(tfr);
  }

  tfrUpdateRequest() {
    this._store.updateTfrUpdateRequest();
  }

  tfrDelete() {
    this._store.updateTfrDelete();
  }

  tfrMenuClick(tfr: TaxFileRecord) {
    this._store.updateActionSheetOpen(tfr);
  }

  tfrConfirm($event: any) {
    this._store.updateTfrConfirm($event);
  }

  tfrCancel() {
    this._store.updateModalClosed();
  }

  /*
  actionSheetDismiss
  */
  actionSheetDismiss(ev: any) {

    if (ev.detail.data !== undefined) //NOT cancel or backdrop clicked

      switch (ev.detail.data.operation) {
        case EntityOperation.Delete: this.tfrDelete(); break;
        case EntityOperation.Update: this.tfrUpdateRequest(); break;
      }
    this._store.updateActionSheetClosed();
  }

  submit(form: any) {
    this._store.updatePatchEmployee(form);
    this._store.effectEditRequestConfirmed(this._store.selectEmployee$);
  }

  // ModalDismiss @param ev IModalCustomEvent< OverlayEventDetail<any> > event payload
  modalDismiss(ev: any) { this._store.updateModalClosed(); }
}
