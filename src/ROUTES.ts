
import { EmployeeFeatureComponent } from './app/employee-feature/components/employee-feature.component';
import { SearchComponent } from './app/employee-feature/components/search/search.component';
import { ListComponent } from './app/employee-feature/components/list/list.component';
import { EmployeeComponent } from './app/employee-feature/components/employee/employee.component';
import { Routes } from '@angular/router';

export const RouteConfig: Routes =
  [

    { path: '', redirectTo: 'employee-feature/list', pathMatch: 'full', },
    {
      path: 'employee-feature', component: EmployeeFeatureComponent, children: [
        { path: '', redirectTo: 'employee-feature/list', pathMatch: 'full', },
        { path: 'search', component: SearchComponent },
        { path: 'list', component: ListComponent },
        { path: 'employee/:id', component: EmployeeComponent },
        { path: 'employee', component: EmployeeComponent }
      ]

    },

  ];



