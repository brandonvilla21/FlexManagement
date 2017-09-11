import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Product } from '../../product/product.model';

@Component({
    selector: 'app-product-confirm-diaglog',
    templateUrl: 'product-confirm.component.html'
})

export class ProductConfirmComponent extends DialogComponent<Product, number> implements Product {
    description = '';
    brand = '';
    flavor = '';
    expiration_date = '';
    sale_price = 0;
    buy_price = 0;
    existence = 0;
    max = 16;
    min = 0;
    product_id = '';

    numberOfProducts = 1;
    total = 0;
    constructor( dialogService: DialogService ) {
        super(dialogService);
     }
    confirm() {
        // we set dialog result as true on click on confirm button,
        // then we can get dialog result from caller code
        this.result = this.numberOfProducts;
        this.close();
    }
}
