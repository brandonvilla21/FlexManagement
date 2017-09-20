import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessesComponent } from './processes.component';
import { PurchaseCreateComponent } from './purchase-create/purchase-create.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SaleComponent } from './sale/sale-create/sale-create.component';


const routes: Routes = [
  {
    path: '',
    component: ProcessesComponent,
    data: {
        title: 'Movimientos'
    },
    children: [
        { path: 'purchase-create', component: PurchaseCreateComponent, data: { title: 'Compras' } },
        { path: 'purchases', component: PurchasesComponent, data: { title: 'Consulta de compras' } },
        { path: 'purchase/:id', component: PurchaseComponent, data: { title: 'Consulta de compra' } },
        { path: 'sale-create',     component: SaleComponent, data: { title: 'Ventas' } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessesRoutingModule { }

export const routedComponents = [ProcessesComponent];
