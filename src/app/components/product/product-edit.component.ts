import { Component, OnInit } from '@angular/core';
import { Product } from './../../interfaces/product';
import { ProductService } from './../../shared/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-edit',
    templateUrl: 'product-edit.component.html',
    styleUrls: ['./product.component.scss']
})

export class ProductEditComponent implements OnInit {
    public productId: string;
    public product: Product;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService
    ) {
        this.activatedRoute.params.subscribe( parameters => {
            this.productId = parameters['id'];
            this.productService.findById( this.productId )
                .subscribe( product => {
                    this.product = product;
                });
        });
    }

    ngOnInit() { }
}
