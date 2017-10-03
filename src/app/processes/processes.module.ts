import { CreditPaymentModule } from './credit-payment/credit-payment.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

// Routing
import { ProcessesRoutingModule } from './processes.routing';

// Services
import { PurchaseProductService } from './services/purchase-product.service';
// Components
import { ProcessesComponent } from './processes.component';
import { PurchaseCreateComponent } from './purchase-create/purchase-create.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { PurchaseComponent } from './purchase/purchase.component';

// Modules
import { SaleModule } from './sale/sale.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ProcessesRoutingModule,
        CreditPaymentModule,
        BootstrapModalModule.forRoot({ container: document.body })
    ],
    exports: [],
    declarations: [
        ProcessesComponent,
        PurchaseCreateComponent,
        PurchasesComponent,
        PurchaseComponent,
        // SaleComponent
    ],
    providers: [ PurchaseProductService ],

})
export class ProcessesModule { }
