import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersComponent } from './components/providers/providers.component';
import { ProviderCreateComponent } from './components/provider-create/provider-create.component';

const routes: Routes = [
  { path: 'providers', component: ProvidersComponent },
  { path: 'provider-create', component: ProviderCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderRoutingModule { }

// export const routedComponents = [ProviderComponent];
