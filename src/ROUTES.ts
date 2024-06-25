
import { EmployeeFeatureComponent } from './app/employee-feature/components/employee-feature.component';
import { SearchComponent } from './app/employee-feature/components/search/search.component';
import { ListComponent } from './app/employee-feature/components/list/list.component';
import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './app/employee-feature/components/form/employee-form.component';

export const RouteConfig: Routes =
  [
    { path: '', redirectTo: 'employee-feature/list', pathMatch: 'full', },

    {
      path: 'employee-feature', component: EmployeeFeatureComponent, children: [
        //{ path: '', redirectTo: 'employee-feature/list', pathMatch: 'full', },
        { path: 'search', component: SearchComponent },
        { path: 'list', component: ListComponent },
        // { path: 'operation/:id', component: OperationComponent },
        { path: 'form', component: EmployeeFormComponent }
      ]

    },

  ];



