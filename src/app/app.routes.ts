import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employee',
    loadComponent: () => import('./employee/employee.component').then((m) => m.EmployeeComponent),
  },
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full',
  },
];
