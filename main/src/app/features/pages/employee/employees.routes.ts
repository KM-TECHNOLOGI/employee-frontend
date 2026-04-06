import { Routes } from '@angular/router';

// employee
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';

export const EmployeeRoutes: Routes = [
  {
    path: '',
    children: [
    {
        path: 'employeeList',
        component: EmployeelistComponent,
      },
      {
        path: 'addEmployee',
        component: AddemployeeComponent,
      },
    ],
  },
];
