import { Provider } from './../../provider/provider.model';
import { Product } from './../../product/product.model';
import { ProviderService } from './../../provider/services/provider/provider.service';
import { ProductService } from './../../product/services/product.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { ProductConfirmComponent } from './../product-confirm/product-confirm.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  public numberOfProducts = 0;
  public currentDate;
  public products: Product[];
  public providers: Provider[];
  public purchasedProducts: Product[] = [];
  public behaviorSubject: BehaviorSubject<Array<Product>>;
  public latestPurchasedProducts: Observable<Array<Product>>;

  constructor(
    private dialogService: DialogService,
    private productService: ProductService,
    private providerService: ProviderService
   ) {
      this.getProviders();
      this.getProducts();
    }

  ngOnInit() {

    this.getDate();
    this.behaviorSubject = new BehaviorSubject<Array<Product>>(this.purchasedProducts);
    this.latestPurchasedProducts = this.behaviorSubject.map( data => data.map(
      d => {
        return d;
      }));
  }

  getProducts() {
    this.productService.all()
      .subscribe( products => this.products = products );
  }

  getProviders() {
    this.providerService.all()
      .subscribe( providers => this.providers = providers );
  }

  showConfirm(product: Product) {
    const disposable = this.dialogService.addDialog(ProductConfirmComponent, {
      description: product.description,
      brand: product.brand,
      flavor: product.flavor,
      expiration_date: product.expiration_date,
      sale_price: product.sale_price,
      buy_price: product.buy_price,
      existence: product.existence,
      max: product.max,
      min: product.min,
      product_id: product.product_id,

    }).subscribe( numberOfProduct => {
      if (numberOfProduct > 0) {
        product.purchaseExistence = numberOfProduct;
        this.addPurchaseProduct(product);
      } else {
        // Has declined
        this.numberOfProducts = -1;
      }
    });
  }

  addPurchaseProduct(product) {
    this.purchasedProducts.push(product);
    this.behaviorSubject.next(this.purchasedProducts);
  }
  getDate() {
    this.currentDate = Observable.interval(1000).map(x => new Date()).share();
  }

}
