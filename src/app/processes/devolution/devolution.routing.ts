import { DevolutionShowComponent } from './components/devolution-show/devolution-show.component';
import { DevolutionCreateComponent } from './components/devolution-create/devolution-create.component';
import { DevolutionsComponent } from './components/devolutions/devolutions.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevolutionComponent } from './devolution.component';

const routes: Routes = [
  {
    path: '',
    component: DevolutionComponent,
    data: {
      title: 'Devoluciones'
    },
    children: [
      { path: 'all', component: DevolutionsComponent },
      { path: 'create', component: DevolutionCreateComponent },
      { path: 'show/:id', component: DevolutionShowComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevolutionRoutingModule { }

export const routedComponents = [DevolutionComponent];
