import { Component, OnInit } from '@angular/core';
import { Product } from './../../interfaces/product';
import { ProductService } from './../../shared/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public products: Product[];
  constructor( private productService: ProductService ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.all()
      .subscribe( data => {
        this.products = data;
      });
  }

}
