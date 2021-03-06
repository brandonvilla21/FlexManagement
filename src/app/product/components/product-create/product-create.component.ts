import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Product } from './../../product.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
})
export class ProductCreateComponent implements OnInit {
  public product: Product = {
    description: '',
    brand: 'BHN',
    flavor: '',
    expiration_date: '',
    sale_price: 0.00,
    buy_price: 0.00,
    existence: 0,
    max: 0,
    min: 0,
    product_id: null,
  };
  constructor( private productService: ProductService ) { }

  ngOnInit() {
  }

  onSubmitProduct(value: NgForm) {
    if (value.valid) {
      this.productService.create( this.product )
        .subscribe( res => {
          console.log(res);
        })
    }
  }
}
