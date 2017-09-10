import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeShowComponent } from './components/employee-show/employee-show.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    data: {
      title: 'Empleados'
    },
    children : [
      {
        path: 'all',
        component: EmployeesComponent,
        data: {
          title: 'Consulta General'
        }
      },
      {
        path: 'create',
        component: EmployeeCreateComponent,
        data: {
          title: 'Registro'
        }
      },
      {
        path: 'edit/:id',
        component: EmployeeEditComponent,
        data: {
          title: 'Edición'
        }
      },
      {
        path: 'show/:id',
        component: EmployeeShowComponent,
        data: {
          title: 'Consulta Individual'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }
