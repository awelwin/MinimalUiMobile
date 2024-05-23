import { Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeComponent } from './components/employee/employee.component';
export const routes: Routes = [

  { path: '', redirectTo: 'employees', pathMatch: 'full', },
  {
    path: 'employees', component: EmployeesComponent, children: [
      { path: 'search', component: EmployeeSearchComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'list', component: EmployeeListComponent },
      { path: 'employee/:id', component: EmployeeComponent },
      { path: 'employee', component: EmployeeComponent }
    ]

  },

];
