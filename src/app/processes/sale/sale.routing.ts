import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleComponent } from './sale.component';
import { SaleCreateComponent } from './components/sale-create/sale-create.component';
import { SaleShowComponent } from './components/sale-show/sale-show.component';
import { SalesComponent } from './components/sales/sales.component';

const routes: Routes = [
  {
    path: '',
    component: SaleComponent,
    data: {
      title: 'Ventas'
    },
    children : [
      {
        path: 'all',
        component: SalesComponent,
        data: {
          title: 'Consulta General'
        }
      },
      {
        path: 'create',
        component: SaleCreateComponent,
        data: {
          title: 'Registro'
        }
      },
      {
        path: 'show/:id',
        component: SaleShowComponent,
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
export class SaleRoutingModule { }
