import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent extends DialogComponent<SearchModalInterface, any> implements OnInit, SearchModalInterface {
  public providers: Provider[] = [];
  public products: Product[] = [];
  public searchTextValue: string;
  public searchOptionValue: string;
  public selectElements: any[];
  private subject: BehaviorSubject<string>;

  type: string;
  title: string;

  constructor(
    dialogService: DialogService,
    private providersService: ProviderService,
    private productService: ProductService
  ) {
    super(dialogService);
    this.selectElements = [];
    this.searchTextValue = '';
    this.searchOptionValue = '';
    this.subject  = new BehaviorSubject<string>(this.searchTextValue);
   }

  ngOnInit() {
    switch ( this.type ) {
      case 'product' :
        // this.getProducts();
        this.setElements(
          { value: 'product_id', name: 'ID Producto' },
          { value: 'description', name: 'Descripción'},
          { value: 'brand', name: 'Marca'},
          { value: 'flavor', name: 'Sabor'}
        );
        this.searchOptionValue = 'product_id';

        break;
      case 'provider':
        this.setElements(
          { value: 'provider_id', name: 'ID Proveedor' },
          { value: 'name', name: 'Nombre' },
          { value: 'description', name: 'Descripción' },
          { value: 'contact', name: 'Contacto' },
          { value: 'email', name: 'Correo' },
          { value: 'phone', name: 'Teléfono' },
        );
        this.searchOptionValue = 'provider_id';
        break;
    }

    // Subscribe to observable for debounce
    this.subject.debounceTime(400).subscribe( searchTextValue => {
      if ( searchTextValue !== '' ) {
        switch ( this.type ) {
          case 'product':
            this.getProductsByColumn();
            break;
          case 'provider':
            this.getProvidersByColumn();
            break;
        }
      }
    });
  }

  confirm( object: any ) {
    this.result = object; // result is passed to subscribe method from addDialog observer
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

  setElements( ...elements ) {
    elements.forEach( element => this.selectElements.push( element ) );
  }

  getProductsByColumn( ...elements ) {
    this.productService.findByColumn( this.searchOptionValue, this.searchTextValue )
    .subscribe( products => this.products = products );
  }

  getProvidersByColumn() {
    this.providersService.findByColumn( this.searchOptionValue, this.searchTextValue )
      .subscribe( providers => this.providers = providers );
  }

  onKeyUp( searchTextValue ) {
    this.subject.next(searchTextValue);
  }

}
