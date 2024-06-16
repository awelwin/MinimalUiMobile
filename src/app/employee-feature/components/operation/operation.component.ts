import { Component, DestroyRef, OnInit } from '@angular/core';
import { IEmployeeFeatureState, } from 'src/app/employee-feature/ngrx/state';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { employee, operation, } from 'src/app/employee-feature/ngrx/selectors';
import { Employee } from 'src/app/employee-feature/lib/Employee';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonButton } from "@ionic/angular/standalone";
import { EntityOperation } from '../../lib/EntityOperation';
import { EmployeeFormComponent } from './form/employee-form.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'employee',
  templateUrl: './operation.component.html',
  styleUrls: ['./form/employee-form.component.scss'],
  imports: [IonButton, AsyncPipe, JsonPipe, ReactiveFormsModule, EmployeeFormComponent, NgIf],
  standalone: true
})
export class OperationComponent implements OnInit {

  // input from global State 
  _operation$: Observable<EntityOperation> = this.store.select(operation);
  _employee$: Observable<Employee> = this.store.select(employee);

  /*
  constructor 
 */
  constructor(private store: Store<IEmployeeFeatureState>) { }

  ngOnInit() { }
}
