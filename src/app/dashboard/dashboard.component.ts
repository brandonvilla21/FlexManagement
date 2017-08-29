import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './../shared/product.service';
import { Product } from './../interfaces/product';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public products: Product[];
  constructor( private productService: ProductService ) { }

  ngOnInit() {
    this.getProducts();
  }
  public getProducts() {
    this.productService.all()
      .subscribe( products => {
        this.products = products;
      });
  }
}
