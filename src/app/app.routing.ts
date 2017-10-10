import { AuthService } from './session/services/auth.service';
import { SignupComponent } from './session/components/signup/signup.component';
import { LoginComponent } from './session/components/login/login.component';
import { SessionComponent } from './session/session.component';
import { PurchaseCreateComponent } from './processes/purchase-create/purchase-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SessionComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [ AuthService ],
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'providers',
        loadChildren: './provider/provider.module#ProviderModule'
      },
      {
        path: 'products',
        loadChildren: './product/product.module#ProductModule'
      },
      {
        path: 'processes',
        loadChildren: './processes/processes.module#ProcessesModule'
      },
      {
        path: 'customers',
        loadChildren: './customer/customer.module#CustomerModule'
      },
      {
        path: 'employees',
        loadChildren: './employee/employee.module#EmployeeModule'
      }
      // { path: 'session', loadChildren: './session/session.module#SessionModule' },
    ]
  },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
