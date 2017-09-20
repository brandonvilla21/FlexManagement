import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleComponent } from './sale.component';
import { SaleCreateComponent } from './components/sale-create/sale-create.component';

const routes: Routes = [
  {
    path: '',
    component: SaleComponent,
    data: {
      title: 'Ventas'
    },
    children : [
      // {
      //   path: 'all',
      //   component: EmployeesComponent,
      //   data: {
      //     title: 'Consulta General'
      //   }
      // },
      {
        path: 'create',
        component: SaleCreateComponent,
        data: {
          title: 'Registro'
        }
      },
      // {
      //   path: 'edit/:id',
      //   component: EmployeeEditComponent,
      //   data: {
      //     title: 'Edición'
      //   }
      // },
      // {
      //   path: 'show/:id',
      //   component: EmployeeShowComponent,
      //   data: {
      //     title: 'Consulta Individual'
      //   }
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleRoutingModule { }
