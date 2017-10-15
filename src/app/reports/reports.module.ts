import { ReportsService } from './services/reports.service';
import { Ng2PdfModule } from './../shared/ng2-pdf/ng2-pdf.module';
import { ReportsRoutingModule } from './reports.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportsComponent } from './reports.component';
import { CustomerReportComponent } from './components/customer-report/customer-report.component';
import { SalesToPayReportComponent } from './components/sales-to-pay-report/sales-to-pay-report.component';

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
        SalesToPayReportComponent
    ],
    providers: [
        ReportsService
    ],
})
export class ReportsModule { }
