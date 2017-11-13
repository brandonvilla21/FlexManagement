import { Component, OnInit } from '@angular/core';
import { Product } from './../../product.model';
import { ProductService } from './../../services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[];
  public product_id: number;
  constructor( private productService: ProductService ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.all()
      .subscribe( data => {
        this.products = data;
      });
  }

  deleteProduct(product) {
    this.productService.delete(product)
      .subscribe(res => {
        this.getProducts();
      });
  }

}
