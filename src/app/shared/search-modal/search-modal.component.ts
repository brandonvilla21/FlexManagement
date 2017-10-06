import { SaleProductInterface } from './../../processes/sale/models/sale-product.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Provider } from './../../provider/provider.model';
import { Employee } from './../../employee/employee.model';
import { Customer } from './../../customer/customer.model';
import { Product } from './../../product/product.model';

import { ProductService } from './../../product/services/product.service';
import { ProviderService } from './../../provider/services/provider/provider.service';
import { EmployeeService } from './../../employee/services/employee/employee.service';
import { CustomerService } from './../../customer/services/customer/customer.service';
import { SaleProductService } from './../../processes/sale/services/sale-product.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface SearchModalInterface {
  type: string,
  title: string
}

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  providers: [
    SaleProductService
  ]
})
export class SearchModalComponent extends DialogComponent<SearchModalInterface, any> implements OnInit, SearchModalInterface {
  public providers: Provider[];
  public employees: Employee[];
  public customers: Customer[];
  public products: Product[];
  public salesProduct: SaleProductInterface[];
  public searchTextValue: string;
  public searchOptionValue: string;
  public selectElements: any[];
  private subject: BehaviorSubject<string>;

  type: string;
  title: string;

  constructor(
    dialogService: DialogService,
    private providersService: ProviderService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private productService: ProductService,
    private saleProductService: SaleProductService
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

      case 'employee':
        this.setElements(
          { value: 'employee_id', name: 'ID Empleado' },
          { value: 'name', name: 'Nombre' },
          { value: 'lastname', name: 'Apellido(s)' },
          { value: 'address', name: 'Dirección' },
          { value: 'whatsapp', name: 'WhatsApp' }
        );
        this.searchOptionValue = 'employee_id';
        break;

      case 'customer':
        this.setElements(
          { value: 'customer_id', name: 'ID Cliente' },
          { value: 'name', name: 'Nombre' },
          { value: 'lastname', name: 'Apellido(s)' },
          { value: 'reference', name: 'Referencia' },
          { value: 'whatsapp', name: 'WhatsApp' },
          { value: 'facebook', name: 'Facebook' },
          { value: 'balance', name: 'Saldo' }
        );
        this.searchOptionValue = 'customer_id';
        break;

      case 'sale_product_for_devolution':
      case 'sale_product_for_payment':
        this.setElements(
          { value: 'sale_id', name: 'ID Venta' },
          { value: 'sale_date', name: 'Fecha de venta' },
          { value: 'customer_id', name: 'ID Cliente' },
          { value: 'employee_id', name: 'ID Empleado' }
        );
        this.searchOptionValue = 'sale_id';
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
          case 'employee':
            this.getEmployeesByColumn();
            break;
          case 'customer':
            this.getCustomersByColumn();
            break;
          case 'sale_product_for_devolution':
            this.getSaleDevolutionByColumn();
            break;
          case 'sale_product_for_payment':
            this.getSalePaymentByColumn();
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

  getEmployees() {
    this.employeeService.all()
      .subscribe( employees => this.employees = employees);
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

  getEmployeesByColumn() {
    this.employeeService.findByColumn( this.searchOptionValue, this.searchTextValue )
      .subscribe( employees => this.employees = employees );
  }

  getCustomersByColumn() {
    this.customerService.findByColumn( this.searchOptionValue, this.searchTextValue )
      .subscribe( customers => this.customers = customers );
  }
  
  getSaleDevolutionByColumn() {
    this.saleProductService.findByColumn( this.searchOptionValue, this.searchTextValue )
      .subscribe( salesProduct => {
        this.salesProduct =  salesProduct.filter( saleProduct => {
          return saleProduct.type === 'CONTADO' && saleProduct.state === 'REGISTRADO';
        })
      });
  }

  getSalePaymentByColumn() {
    this.saleProductService.findByColumn( this.searchOptionValue, this.searchTextValue )
      .subscribe( salesProduct => {
        this.salesProduct =  salesProduct.filter( saleProduct => {
          return saleProduct.type === 'CRÉDITO' && saleProduct.state === 'REGISTRADO' && (saleProduct.total - saleProduct.total_payment) != 0;
        })
      });
  }

  onKeyUp( searchTextValue ) {
    this.subject.next(searchTextValue);
  }

}
