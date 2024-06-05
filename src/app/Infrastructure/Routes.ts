
import { EmployeesComponent } from '../components/employees/employees.component';
import { EmployeeSearchComponent } from '../components/employee-search/employee-search.component';
import { EmployeeListComponent } from '../components/employee-list/employee-list.component';
import { EmployeeComponent } from '../components/employee/employee.component';
import { Routes } from '@angular/router';

export const RouteConfig: Routes =
  [

    { path: '', redirectTo: 'employees/list', pathMatch: 'full', },
    {
      path: 'employees', component: EmployeesComponent, children: [
        { path: '', redirectTo: 'employees/list', pathMatch: 'full', },
        { path: 'search', component: EmployeeSearchComponent },
        { path: 'list', component: EmployeeListComponent },
        { path: 'employee/:id', component: EmployeeComponent },
        { path: 'employee', component: EmployeeComponent }
      ]

    },

  ];



