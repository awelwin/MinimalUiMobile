import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumericValidator } from 'src/app/common/utils/NumericValidator';
import { FormUtils } from 'src/app/common/utils/FormUtils';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/employee-feature/lib/Employee';
import { EntityOperation } from 'src/app/employee-feature/lib/EntityOperation';
import { ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonActionSheet } from "@ionic/angular/standalone";
import { TaxFileRecord } from 'src/app/employee-feature/lib/TaxFileRecord';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { IActionSheetButton } from 'src/app/common/ionic/IActionSheetButton';
import { IEmployeeForm } from 'src/app/employee-feature/ngrx/state';
import { Store } from '@ngrx/store';
@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  standalone: true,
  imports: [IonActionSheet, IonButton, AsyncPipe, ReactiveFormsModule, NgFor, DatePipe]
})
export class EmployeeFormComponent implements OnInit {

  @Input("employee") e: Employee = null!;
  @Input("operation") op: EntityOperation = null!;
  @Output() employee = new EventEmitter<Employee>()


  _FORM: FormGroup = null!;
  _taxFileRecords: TaxFileRecord[] = [];

  // Validation state (local)
  _ageValid$!: Observable<boolean>;
  _firstnameValid$!: Observable<boolean>;
  _lastnameValid$!: Observable<boolean>;
  _aliasValid$!: Observable<boolean>;
  _valid$!: Observable<boolean>;

  _actionSheetButtons: IActionSheetButton[] = null!;

  constructor(
    private fb: FormBuilder,
    private store: Store<IEmployeeForm>
  ) { }

  ngOnInit() {

    this._taxFileRecords = this.e.taxFile.taxFileRecords

    //form
    this._FORM = this.fb.group({
      resourceName: this.e.resourceName,
      id: this.e.id,
      created: this.e.created,
      updated: this.e.updated,
      firstname: [this.e.firstname, [Validators.required, Validators.maxLength(50)]],
      lastname: [this.e.lastname, [Validators.required, Validators.maxLength(50)]],
      age: [this.e.age, NumericValidator],
      // taxfile
      taxFile: this.fb.group({
        id: this.e.taxFile.id,
        employeeId: this.e.taxFile.employeeId,
        alias: [this.e.taxFile.alias, Validators.required],
        created: this.e.taxFile.created,
        updated: this.e.taxFile.updated,
        //taxFileRecords
        taxFileRecords: this.fb.array([])
      })
    });

    // validation state (local)
    this._ageValid$ = FormUtils.isControlValidAsync(this._FORM.controls['age']);
    this._firstnameValid$ = FormUtils.isControlValidAsync(this._FORM.controls['firstname']);
    this._lastnameValid$ = FormUtils.isControlValidAsync(this._FORM.controls['lastname']);
    this._aliasValid$ = FormUtils.isControlValidAsync(this._FORM.get('taxFile.alias')!);
    this._valid$ = FormUtils.isControlValidAsync(this._FORM);

    //actionsheet
    this._actionSheetButtons = [
      { text: "delete", cssClass: "action-sheet-button-delete", data: EntityOperation.DeleteRequest },
      { text: "edit", cssClass: "action-sheet-button-default", data: EntityOperation.Update },
      { text: "cancel", cssClass: "action-sheet-button-default", data: "" }
    ];

  }

  submit() {
    console.log(this._FORM.value);
    console.log(this._FORM.getRawValue);
    //this.employee.emit()
  }

  addTfr(tfr: TaxFileRecord): void {
    const existing = this._FORM.controls["taxFileRecords"] as FormArray
    existing.push(new FormControl(''))
  }


  /*
 actionSheetDismiss
  */
  actionSheetDismiss(ev: any) {

    //close sheet
    this.store.dispatch({ type: EmployeeFeatureAction.ActionSheetClose });

    /*
    if (ev.detail.data !== null && ev.detail.data !== "") //NOT cancel or backdrop clicked
      switch (ev.detail.data) {
        case EntityOperation.DeleteRequest:
          this.store.dispatch({ type: EmployeeFeatureAction.DeleteRequest }); break;
        case EntityOperation.Update:
          this.store.dispatch({ type: EmployeeFeatureAction.EditRequest });
          break;
      }
          */
  }



}
