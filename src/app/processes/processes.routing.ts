import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessesComponent } from './processes.component';
import { PurchaseComponent } from './purchase/purchase.component';


const routes: Routes = [
  {
    path: '',
    component: ProcessesComponent,
    data: {
        title: 'Movimientos'
    },
    children: [
        { path: 'purchase', component: PurchaseComponent, data: { title: 'Compras' } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessesRoutingModule { }

export const routedComponents = [ProcessesComponent];
