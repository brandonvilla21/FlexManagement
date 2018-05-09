import { ReportsService } from './services/reports.service';
import { FormsModule } from '@angular/forms';
import { Ng2PdfModule } from './../shared/ng2-pdf/ng2-pdf.module';
import { ReportsRoutingModule } from './reports.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportsComponent } from './reports.component';
import { CustomerReportComponent } from './components/customer-report/customer-report.component';
import { SalesToPayReportComponent } from './components/sales-to-pay-report/sales-to-pay-report.component';
import { ProductListReportComponent } from './components/product-list-report/product-list-report.component';
import { SaleHistoryReportComponent } from './components/sale-history-report/sale-history-report.component';
import { ProviderReportComponent } from './components/provider-report/provider-report.component';
import { EmployeeReportComponent } from './components/employee-report/employee-report.component';
import { PurchaseHistoryReportComponent } from './components/purchase-history-report/purchase-history-report.component';
import { AccountStatusComponent } from './components/account-status/account-status.component';
import { MostSelledProductsComponent } from './components/most-selled-products/most-selled-products.component';
import { ChartsModule } from 'ng2-charts';
import { PaymentByEmployeeReportComponent } from './components/payment-by-employee-report/payment-by-employee-report.component';
import { MissingProductsComponent } from './components/missing-products/missing-products.component';

@NgModule({
    imports: [
        CommonModule,
        ReportsRoutingModule,
        Ng2PdfModule,
        ChartsModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        ReportsComponent,
        CustomerReportComponent,
        SalesToPayReportComponent,
        ProductListReportComponent,
        SaleHistoryReportComponent,
        ProviderReportComponent,
        EmployeeReportComponent,
        PurchaseHistoryReportComponent,
        AccountStatusComponent,
        MostSelledProductsComponent,
        PaymentByEmployeeReportComponent,
        MissingProductsComponent
    ],
    providers: [ReportsService],
})
export class ReportsModule { }
