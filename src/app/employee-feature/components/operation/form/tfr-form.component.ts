import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaxFileRecord } from 'src/app/employee-feature/lib/TaxFileRecord';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-tfr-form',
  templateUrl: './tfr-form.component.html',
  styleUrls: ['./tfr-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class TfrFormComponent implements OnInit {

  @Input() tfr: TaxFileRecord[] = null!;
  @Output() taxFileRecord = new EventEmitter<TaxFileRecord>();
  _FORM: FormGroup = null!;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this._FORM = this.fb.group({
      taxFileRecords: this.fb.array([
        this.tfr?.forEach(x => (
          this.fb.group({
            id: x.id,
            taxfileId: x.taxFileId,
            financialYear: [x.financialYear, [Validators.required]],
            amountPaid: [x.amountPaid, [Validators.required]],
            amountClaimed: [x.amountClaimed, [Validators.required]],
            created: x.created,
            updated: x.updated
          })
        ))
      ])
    });
  }
}
