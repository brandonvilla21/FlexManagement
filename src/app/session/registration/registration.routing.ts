import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration.component';

const routes: Routes = [
    {
        path: '',
        component: RegistrationComponent,
        children: [

        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule { }

export const routedComponents = [RegistrationComponent];
