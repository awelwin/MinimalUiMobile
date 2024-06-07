
import { EmployeeFeatureComponent } from './app/employee-feature/components/employee-feature.component';
import { EmployeeSearchComponent } from './app/employee-feature/components/employee-search/employee-search.component';
import { EmployeeListComponent } from './app/employee-feature/components/employee-list/employee-list.component';
import { EmployeeComponent } from './app/employee-feature/components/employee/employee.component';
import { Routes } from '@angular/router';

export const RouteConfig: Routes =
  [

    { path: '', redirectTo: 'employees/list', pathMatch: 'full', },
    {
      path: 'employee-feature', component: EmployeeFeatureComponent, children: [
        { path: '', redirectTo: 'employee-feature/list', pathMatch: 'full', },
        { path: 'search', component: EmployeeSearchComponent },
        { path: 'list', component: EmployeeListComponent },
        { path: 'employee/:id', component: EmployeeComponent },
        { path: 'employee', component: EmployeeComponent }
      ]

    },

  ];



