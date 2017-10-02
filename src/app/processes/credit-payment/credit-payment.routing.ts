import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditPaymentComponent } from './credit-payment.component';
import { CreditPaymentCreateComponent } from './components/credit-payment-create/credit-payment-create.component';

const routes: Routes = [
  {
    path: '',
    component: CreditPaymentComponent,
    data: {
        title: 'Abonos'
    },
    children: [
        { path: 'create', component: CreditPaymentCreateComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditPaymentRoutingModule { }

export const routedComponents = [CreditPaymentComponent];
