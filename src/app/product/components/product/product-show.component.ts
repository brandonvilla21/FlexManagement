import { ProductService } from './../../services/product.service';
import { Product } from './../../product.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';


@Component({
    selector: 'app-product-show',
    templateUrl: 'product-show.component.html',
    styleUrls: ['./product.component.scss']
})

export class ProductShowComponent implements OnInit {
    public productId: String;
    public product: Product;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService
    ) {
        this.activatedRoute.params.subscribe( parameters => {
            this.productId = parameters['id'];
            this.productService.findById( this.productId )
                .subscribe( product => {
                    this.product = product[0];
                });
        });
    }

    ngOnInit() { }

}
