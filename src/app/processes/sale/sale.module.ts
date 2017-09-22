import { SaleProductService } from './services/sale-product.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SaleComponent } from './sale.component';
import { SaleCreateComponent } from './components/sale-create/sale-create.component';
import { SaleShowComponent } from './components/sale-show/sale-show.component';
import { SaleRoutingModule } from './sale.routing';
import { SalesComponent } from './components/sales/sales.component';

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
        SaleShowComponent,
        SalesComponent
    ],
    providers: [
      SaleProductService
    ],
})
export class SaleModule { }
