import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderComponent } from './provider.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { ProviderCreateComponent } from './components/provider-create/provider-create.component';

const routes: Routes = [
  {
    path: '',
    component: ProviderComponent,
    data: {
      title: 'Proveedores'
    },
    children : [
      {
        path: 'all',
        component: ProvidersComponent,
        data: {
          title: 'Consulta General'
        }
      },
      {
        path: 'create',
        component: ProviderCreateComponent,
        data: {
          title: 'Registro'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderRoutingModule { }
