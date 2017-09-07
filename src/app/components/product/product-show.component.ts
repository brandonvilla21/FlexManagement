import { ProductService } from './../../shared/product.service';
import { Product } from './../../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-show',
    templateUrl: 'product-show.component.html',
    styleUrls: ['./product.component.scss']
})

export class ProductShowComponent implements OnInit {
    public productId: String;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService
    ) {
        this.activatedRoute.params.subscribe( parameters => {
            this.productId = parameters['id'];
            // Call method this.productService.findByid( => bla bla)
        });
    }

    ngOnInit() { }

}
