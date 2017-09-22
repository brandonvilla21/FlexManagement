import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevolutionComponent } from './devolution.component';

const routes: Routes = [
  { path: 'path', component: DevolutionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevolutionRoutingModule { }

export const routedComponents = [DevolutionComponent];
