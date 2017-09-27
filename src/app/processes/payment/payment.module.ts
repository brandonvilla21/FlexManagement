// import { SaleProductService } from './services/sale-product.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaymentComponent } from './payment.component';

import { PaymentRoutingModule } from './payment.routing';
import { PaymentCreateComponent } from './components/payment-create/payment-create.component';
import { PaymentService } from './services/payment.service';
// import { SaleCreateComponent } from './components/sale-create/sale-create.component';
// import { SaleShowComponent } from './components/sale-show/sale-show.component';
// import { SaleRoutingModule } from './sale.routing';
// import { SalesComponent } from './components/sales/sales.component';

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
        // SaleShowComponent,
        // SalesComponent
    ],
    providers: [
      PaymentService
    ],
})
export class PaymentModule { }
