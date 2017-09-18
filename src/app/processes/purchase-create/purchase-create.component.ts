import { ProductPurchaseProductInterface } from './../models/product-purchase-product.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchModalComponent } from './../../shared/search-modal/search-modal.component';
import { Provider } from './../../provider/provider.model';
import { Product } from './../../product/product.model';
import { ProviderService } from './../../provider/services/provider/provider.service';
import { ProductService } from './../../product/services/product.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from 'ng2-bootstrap-modal';
import { PurchaseProductInterface } from './../models/purchase-product.model';
import { PurchaseProductService } from './../services/purchase-product.service';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.scss']
})
export class PurchaseCreateComponent implements OnInit {
  public numberOfProducts = 1;
  public currentDate;
  public products: Product[];
  public providers: Provider[];
  public purchasedProducts: Product[] = [];
  public behaviorSubject: BehaviorSubject<Array<Product>>;
  public latestPurchasedProducts: Observable<Array<Product>>;
  public subtotal = 0;
  public discount = 0;
  public total = 0;
  public providerForm: Provider = {
    name: '',
    description: '',
    contact: '',
    email: '',
    phone: '',
    provider_id: '',
  };
  public productForm: Product = {
    description: '',
    brand: '',
    flavor: '',
    expiration_date: '',
    sale_price: 0,
    buy_price: 0,
    existence: 0,
    max: 0,
    min: 0,
    product_id: '',
    purchaseExistence: 0,
  }

  public purchaseProduct: PurchaseProductInterface = {
    purchase_id: '',
    provider_id: '',
    purchase_date: new Date(),
    subtotal: 0,
    discount: 0,
    total: 0,
    product_purchaseProduct: [],
  }

  constructor(
    private dialogService: DialogService,
    private productService: ProductService,
    private providerService: ProviderService,
    private purchaseProductService: PurchaseProductService
  ) {
      this.getProviders();
      this.getProducts();
      this.getPurchaseCount();
    }

  ngOnInit() {

    this.getDate();
    this.behaviorSubject = new BehaviorSubject<Array<Product>>(this.purchasedProducts);
    this.latestPurchasedProducts = this.behaviorSubject.map( data => data.map(
      d => {
        return d;
      }));
  }

  private getProducts() {
    this.productService.all()
      .subscribe( products => this.products = products );
  }

  private getProviders() {
    this.providerService.all()
      .subscribe( providers => this.providers = providers );
  }

  private getPurchaseCount() {
    this.purchaseProductService.count()
      .subscribe( res => this.purchaseProduct.purchase_id = res[0].number_of_purchase + 1 );
  }

  showModalSearch(type: string, title: string) {
    const disposable = this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title,
    }).subscribe( data => {
      if (data) {
        if (type === 'provider') {
          this.providerForm = data;
        } else if ( type === 'product' ) {
          this.productForm = data;
        }
      }
    });
  }

  addProductToTable( product: Product ) {
    if ( product.product_id !== '' ) {
      product.purchaseExistence = this.numberOfProducts;
      this.addPurchaseProduct({ // If I pass product variable, it will cause some errors in lines 120, 121 and 122
        description: product.description ,
        brand: product.brand ,
        flavor: product.flavor ,
        expiration_date: product.expiration_date ,
        sale_price: product.sale_price ,
        buy_price: product.buy_price ,
        existence: product.existence ,
        max: product.max ,
        min: product.min ,
        product_id: product.product_id ,
        purchaseExistence: product.purchaseExistence ,
      });

      this.calculateCosts( product.buy_price * product.purchaseExistence )

      this.productForm.product_id = '';
      this.productForm.description = '';
      this.productForm.brand = '';
      this.productForm.buy_price = 0;
      this.numberOfProducts = 1;
    } else {
      // It has not selected any product
    }

  }

  addPurchaseProduct(product) {
    this.purchasedProducts.push(product);
    this.behaviorSubject.next(this.purchasedProducts);
  }

  removeFromPurchased( product: Product ) {

    const index = this.purchasedProducts.indexOf(product);
    this.purchasedProducts.splice(index, 1);

    // Call the observable
    this.behaviorSubject.next(this.purchasedProducts);

    this.calculateCosts( ( product.buy_price * product.purchaseExistence ) * -1 )

  }

  private calculateCosts( subtotal ) {
    this.subtotal += subtotal;
    this.discount = this.subtotal >= 5000 ? this.subtotal * .10 : 0;
    this.total = this.subtotal - this.discount;
  }

  private getDate() {
    this.currentDate = Observable.interval(1000).map(x => new Date()).share();
  }


  onSubmitPurchase ( form: NgForm ) {
    this.purchaseProduct.provider_id = this.providerForm.provider_id;
    this.purchaseProduct.subtotal = this.subtotal;
    this.purchaseProduct.discount = this.discount;
    this.purchaseProduct.total = this.total;
    this.purchasedProducts.forEach( product => {
      this.purchaseProduct.product_purchaseProduct.push({
        purchase_id: this.purchaseProduct.purchase_id,
        product_id: product.product_id,
        price: product.buy_price,
        amount: product.purchaseExistence,
      });
    });
    console.log( this.purchaseProduct );
    this.insertPurchase();
  }

  private insertPurchase () {
    this.purchaseProductService.create( this.purchaseProduct )
      .subscribe( res => console.log( res ) );
  }


}
