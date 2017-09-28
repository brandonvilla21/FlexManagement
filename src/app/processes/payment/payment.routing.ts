import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentComponent } from './payment.component';
import { PaymentCreateComponent } from './components/payment-create/payment-create.component';
import { PaymentsComponent } from './components/payments/payments.component';
// import { SaleShowComponent } from './components/sale-show/sale-show.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    data: {
      title: 'Abonos'
    },
    children : [
      {
        path: 'all',
        component: PaymentsComponent,
        data: {
          title: 'Consulta General'
        }
      },
      {
        path: 'create',
        component: PaymentCreateComponent,
        data: {
          title: 'Registro'
        }
      },
    //   {
    //     path: 'show/:id',
    //     component: SaleShowComponent,
    //     data: {
    //       title: 'Consulta Individual'
    //     }
    //   }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule { }
