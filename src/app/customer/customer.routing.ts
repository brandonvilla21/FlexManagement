import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerShowComponent } from './components/customer-show/customer-show.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    data: {
      title: 'Clientes'
    },
    children : [
      {
        path: 'all',
        component: CustomersComponent,
        data: {
          title: 'Consulta General'
        }
      },
      {
        path: 'create',
        component: CustomerCreateComponent,
        data: {
          title: 'Registro'
        }
      },
      {
        path: 'edit/:id',
        component: CustomerEditComponent,
        data: {
          title: 'Edición'
        }
      },
      {
        path: 'show/:id',
        component: CustomerShowComponent,
        data: {
          title: 'Consulta Individual'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
