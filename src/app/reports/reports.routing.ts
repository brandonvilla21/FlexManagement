import { SalesToPayReportComponent } from './components/sales-to-pay-report/sales-to-pay-report.component';
import { CustomerReportComponent } from './components/customer-report/customer-report.component';
import { ProductListReportComponent } from './components/product-list-report/product-list-report.component';
import { SaleHistoryReportComponent } from './components/sale-history-report/sale-history-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';

const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        children: [
            { path: 'customer-report', component: CustomerReportComponent },
            { path: 'sales-to-pay-report', component: SalesToPayReportComponent },
            { path: 'product-list-report', component: ProductListReportComponent },
            { path: 'sale-history-report', component: SaleHistoryReportComponent },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule { }

export const routedComponents = [ReportsComponent];
