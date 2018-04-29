import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Product } from './../../product.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
})
export class ProductCreateComponent implements OnInit {
  public product: Product = {
    description: '',
    brand: 'BHN',
    flavor: 'VAINILLA',
    expiration_date: '',
    sale_price: 0.00,
    buy_price: 0.00,
    existence: 0,
    max: 0,
    min: 0,
    product_id: null,
  };
  constructor( private productService: ProductService, private router: Router ) { }

  ngOnInit() {
  }

  onSubmitProduct(value: NgForm) {
    if (value.valid) {
      this.productService.create( this.product )
        .subscribe( res => {
          console.log(res);
          this.router.navigate(['/products/all']);
        })
    }
  }
}
