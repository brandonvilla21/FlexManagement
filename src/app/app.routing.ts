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
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
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
        path: 'customers',
        loadChildren: './customer/customer.module#CustomerModule'
      },
      {
        path: 'products',
        loadChildren: './product/product.module#ProductModule'
      },
      {
        path: 'employees',
        loadChildren: './employee/employee.module#EmployeeModule'
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
