import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Product
import { ProductComponent } from './components/product/product.component';
import { ProductCreateComponent } from './components/product/product-create.component';
import { ProductEditComponent } from './components/product/product-edit.component';
import { ProductShowComponent } from './components/product/product-show.component';

// Customer
import { CustomerComponent } from './components/customer/customers/customer.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';

// Provider
import { ProviderCreateComponent } from './components/provider/provider-create/provider-create.component';
import { ProvidersComponent } from './components/provider/providers/providers.component';
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
        path: 'products',
        component: ProductComponent
      },
      {
        path: 'product-create',
        component: ProductCreateComponent
      },
      {
        path: 'product-show/:id',
        component: ProductShowComponent
      },
      {
        path: 'product-edit/:id',
        component: ProductEditComponent
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
        path: 'customer-edit',
        component: CustomerEditComponent
      },
      

      {
        path: 'providers',
        component: ProvidersComponent
      },
      {
        path: 'provider-create',
        component: ProviderCreateComponent

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
