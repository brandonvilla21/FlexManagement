import { ProductConfirmComponent } from './product-confirm/product-confirm.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

// Routing
import { ProcessesRoutingModule } from './processes.routing';

// Components
import { ProcessesComponent } from './processes.component';
import { PurchaseComponent } from './purchase/purchase.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ProcessesRoutingModule,
        BootstrapModalModule.forRoot({ container: document.body })
    ],
    exports: [],
    declarations: [
        ProcessesComponent,
        PurchaseComponent,
        ProductConfirmComponent
    ],
    providers: [],
    entryComponents: [ ProductConfirmComponent ]

})
export class ProcessesModule { }
