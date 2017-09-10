import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Customer
import { CustomerComponent } from './components/customer/customers/customer.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';

// Employee
import { EmployeesComponent } from './components/employee/employees/employees.component'
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';

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
        path: 'products',
        loadChildren: './product/product.module#ProductModule'
      },
      {
        path: 'customers',
        component: CustomerComponent
      },
      {
        path: 'customer-create',
        component: CustomerCreateComponent
      },
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'employee-create',
        component: EmployeeCreateComponent
      },
    ]
  },
  { path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
