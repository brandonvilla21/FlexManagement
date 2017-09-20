import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SaleComponent } from './sale.component';
import { SaleCreateComponent } from './components/sale-create/sale-create.component';
import { SaleRoutingModule } from './sale.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SaleRoutingModule,
    ],
    exports: [],
    declarations: [
        SaleComponent,
        SaleCreateComponent,
    ],
    providers: [

    ],
})
export class SaleModule { }
