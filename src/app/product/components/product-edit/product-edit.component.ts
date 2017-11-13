import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Product } from './../../product.model';
import { ProductService } from './../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-edit',
    templateUrl: 'product-edit.component.html',
    styleUrls: ['./product-edit.component.scss']
})

export class ProductEditComponent implements OnInit {
    public productId: string;
    public product: Product;

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private router: Router
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


    onSubmitProductEdit(value: NgForm) {
      if (value.valid) {
        this.productService.update( this.product )
          .subscribe( res => {
            console.log(res);
            this.router.navigate(['/products/all']);
          })
      }
    }

}
