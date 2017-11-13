import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductShowComponent } from './components/product/product-show.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductsComponent } from './components/products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    data: {
      title: 'Productos'
    },
    children: [
      { path: 'all', component: ProductsComponent, data: {title: 'Consulta General'} },
      { path: 'create', component: ProductCreateComponent, data: {title: 'Registro'} },
      { path: 'show/:id', component: ProductShowComponent, data: {title: 'Consulta Individual'} },
      { path: 'edit/:id', component: ProductEditComponent, data: {title: 'Consulta Edición'} },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
