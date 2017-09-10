import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product.routing';

// Services
import { ProductService } from './services/product.service';

import { ProductComponent } from './product.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ProductRoutingModule
    ],
    exports: [],
    declarations: [
        ProductComponent,
        ProductsComponent,
        ProductCreateComponent
    ],
    providers: [
        ProductService
    ],
})
export class ProductModule { }
