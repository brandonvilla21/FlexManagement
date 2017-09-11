import { Provider } from './../../provider/provider.model';
import { ProductService } from './../../product/services/product.service';
import { ProviderService } from './../../provider/services/provider/provider.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Product } from './../../product/product.model';

export interface SearchModalInterface {
  type: string,
  title: string
}

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
})
export class SearchModalComponent extends DialogComponent<SearchModalInterface, any> implements OnInit, SearchModalInterface {
  public providers: Provider[];
  public products: Product[];

  type: string;
  title: string;

  constructor(
    dialogService: DialogService,
    private providersService: ProviderService,
    private productService: ProductService
  ) {
    super(dialogService);
   }

  ngOnInit() {
    if ( this.type === 'provider' ) {
      this.getProviders();
    } else if ( this.type === 'product' ) {
      this.getProducts();
    }
  }

  confirm(object: any) {
    this.result = object;
    this.close();
  }

  getProviders() {
    this.providersService.all()
      .subscribe( providers => this.providers = providers);
  }

  getProducts() {
    this.productService.all()
      .subscribe( products => this.products = products);
  }

}
