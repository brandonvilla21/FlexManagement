import { FormsModule } from '@angular/forms';
import { Ng2PdfModule } from './../shared/ng2-pdf/ng2-pdf.module';
import { ReportsRoutingModule } from './reports.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportsComponent } from './reports.component';
import { ReportsService } from './components/services/reports.service';
import { CustomerReportComponent } from './components/customer-report/customer-report.component';
import { ProductListReportComponent } from './components/product-list-report/product-list-report.component';
import { SaleHistoryReportComponent } from './components/sale-history-report/sale-history-report.component';

@NgModule({
    imports: [
        CommonModule,
        ReportsRoutingModule,
        Ng2PdfModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        ReportsComponent,
        CustomerReportComponent,
        ProductListReportComponent,
        SaleHistoryReportComponent
    ],
    providers: [ReportsService],
})
export class ReportsModule { }
