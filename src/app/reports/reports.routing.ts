import { FlavorsReportComponent } from './components/flavors-report/flavors-report.component';
import { AccountStatusComponent } from './components/account-status/account-status.component';
import { ProviderReportComponent } from './components/provider-report/provider-report.component';
import { EmployeeReportComponent } from './components/employee-report/employee-report.component';
import { SalesToPayReportComponent } from './components/sales-to-pay-report/sales-to-pay-report.component';
import { CustomerReportComponent } from './components/customer-report/customer-report.component';
import { ProductListReportComponent } from './components/product-list-report/product-list-report.component';
import { SaleHistoryReportComponent } from './components/sale-history-report/sale-history-report.component';
import { PurchaseHistoryReportComponent } from './components/purchase-history-report/purchase-history-report.component';
import { MostSelledProductsComponent } from './components/most-selled-products/most-selled-products.component';
import { PaymentByEmployeeReportComponent } from './components/payment-by-employee-report/payment-by-employee-report.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { MissingProductsComponent } from './components/missing-products/missing-products.component';

const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        children: [
            { path: 'customer-report', component: CustomerReportComponent },
            { path: 'employee-report', component: EmployeeReportComponent },
            { path: 'provider-report', component: ProviderReportComponent },
            { path: 'sales-to-pay-report', component: SalesToPayReportComponent },
            { path: 'product-list-report', component: ProductListReportComponent },
            { path: 'sale-history-report', component: SaleHistoryReportComponent },
            { path: 'purchase-history-report', component: PurchaseHistoryReportComponent },
            { path: 'account-status-report', component: AccountStatusComponent },
            { path: 'most-selled-products-report', component: MostSelledProductsComponent },
            { path: 'payment-by-employee-report', component: PaymentByEmployeeReportComponent },
            { path: 'missing-products', component: MissingProductsComponent },
            { path: 'most-wanted-flavors', component: FlavorsReportComponent },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule { }

export const routedComponents = [ReportsComponent];
