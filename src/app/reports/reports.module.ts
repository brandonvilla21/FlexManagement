import { Ng2PdfModule } from './../shared/ng2-pdf/ng2-pdf.module';
import { ReportsRoutingModule } from './reports.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportsComponent } from './reports.component';
import { ReportsService } from './components/services/reports.service';
import { CustomerReportComponent } from './components/customer-report/customer-report.component';
import { ProductListReportComponent } from './components/product-list-report/product-list-report.component';

@NgModule({
    imports: [
        CommonModule,
        ReportsRoutingModule,
        Ng2PdfModule
    ],
    exports: [],
    declarations: [
        ReportsComponent,
        CustomerReportComponent,
        ProductListReportComponent
    ],
    providers: [ReportsService],
})
export class ReportsModule { }
