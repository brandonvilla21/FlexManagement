// import { SaleProductService } from './services/sale-product.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaymentComponent } from './payment.component';

import { PaymentCreateComponent } from './components/payment-create/payment-create.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PaymentService } from './services/payment.service';
import { PaymentRoutingModule } from './payment.routing';
import { PaymentShowComponent } from './components/payment-show/payment-show.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PaymentRoutingModule,
    ],
    exports: [],
    declarations: [
      PaymentComponent,
      PaymentCreateComponent,
      PaymentShowComponent,
      PaymentsComponent
    ],
    providers: [
      PaymentService
    ],
})
export class PaymentModule { }
