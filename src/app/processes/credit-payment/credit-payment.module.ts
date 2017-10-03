import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreditPaymentCreateComponent } from './components/credit-payment-create/credit-payment-create.component';
import { CreditPaymentRoutingModule } from './credit-payment.routing';
import { NgModule } from '@angular/core';

import { CreditPaymentComponent } from './credit-payment.component';
import { SaleDetailModalComponent } from './components/sale-detail-modal-component/sale-detail-modal.component';

@NgModule({
    imports: [
        CreditPaymentRoutingModule,
        CommonModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        CreditPaymentComponent,
        CreditPaymentCreateComponent,
        SaleDetailModalComponent
    ],
    providers: [],
    entryComponents: [ SaleDetailModalComponent ]
})
export class CreditPaymentModule { }
