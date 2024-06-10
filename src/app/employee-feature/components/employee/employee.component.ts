import { Component, DestroyRef, OnInit } from '@angular/core';
import { IEmployeeFeatureState } from 'src/app/employee-feature/ngrx/state';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { employee } from 'src/app/employee-feature/ngrx/selectors';
import { Employee } from 'src/app/employee-feature/lib/Employee';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  imports: [AsyncPipe, JsonPipe],
  standalone: true
})
export class EmployeeComponent implements OnInit {
  _employee$!: Observable<Employee>;

  constructor(private store: Store<IEmployeeFeatureState>) {
    this._employee$ = store.select(employee);
  }

  ngOnInit() {

  }

}