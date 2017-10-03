import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SaleProductInterface } from './../../../sale/models/sale-product.model';
import { ProductSaleProductInterface } from './../../../sale/models/product-sale-product.model';
import { Employee } from './../../../../employee/employee.model';
import { Customer } from './../../../../customer/customer.model';
import { Product } from './../../../../product/product.model';

import { ProductService } from './../../../../product/services/product.service';
import { EmployeeService } from './../../../../employee/services/employee/employee.service';
import { CustomerService } from './../../../../customer/services/customer/customer.service';
import { SaleProductService } from './../../../../processes/sale/services/sale-product.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface SaleProductInterface {
  sale_id: string,
  customer_id: string,
  employee_id: string,
  sale_date: Date,
  type: string,
  state: string,
  subtotal: number,
  discount: number,
  total: number,
  total_payment: number,
  product_saleProduct: ProductSaleProductInterface[];
}

@Component({
  selector: 'app-sale-detail-modal-component',
  templateUrl: './sale-detail-modal.component.html',
  styleUrls: ['./sale-detail-modal.component.scss'],
  providers: [
    SaleProductService
  ]
})
export class SaleDetailModalComponent extends DialogComponent<SaleProductInterface, any> implements OnInit, SaleProductInterface {
  public employee: Employee;
  public customer: Customer;
  
  public products: Product[];
  private subject: BehaviorSubject<string>;

  sale_id: string;
  customer_id: string;
  employee_id: string;
  sale_date: Date;
  type: string;
  state: string;
  subtotal: number;
  discount: number;
  total: number;
  total_payment: number;
  product_saleProduct: ProductSaleProductInterface[];

  constructor(
    dialogService: DialogService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private productService: ProductService,
    private saleProductService: SaleProductService
  ) {
      super(dialogService);
   }

  ngOnInit() {

    this.getEmployee(this.employee_id);
    this.getCustomer(this.customer_id);
    
  }

  confirm( object: any ) {
    this.result = object; // result is passed to subscribe method from addDialog observer
    this.close();
  }

  // getProviders() {
  //   this.providersService.all()
  //     .subscribe( providers => this.providers = providers);
  // }

  getEmployee(id) {
    this.employeeService.findById(id)
      .subscribe( employee => {
        this.employee = employee[0]
        console.log('this.employee: ', this.employee);
      } );
  }

  getCustomer(id) {
    this.customerService.findById(id)
      .subscribe( customer => {
        this.customer = customer[0]
        console.log('this.customer: ', this.customer);

      } );
  }

  get

  // getProducts() {
  //   this.productService.all()
  //     .subscribe( products => this.products = products);
  // }

  // setElements( ...elements ) {
  //   elements.forEach( element => this.selectElements.push( element ) );
  // }

  // getProductsByColumn( ...elements ) {
  //   this.productService.findByColumn( this.searchOptionValue, this.searchTextValue )
  //   .subscribe( products => this.products = products );
  // }

  // getProvidersByColumn() {
  //   this.providersService.findByColumn( this.searchOptionValue, this.searchTextValue )
  //     .subscribe( providers => this.providers = providers );
  // }

  // getEmployeesByColumn() {
  //   this.employeeService.findByColumn( this.searchOptionValue, this.searchTextValue )
  //     .subscribe( employees => this.employees = employees );
  // }

  // getCustomersByColumn() {
  //   this.customerService.findByColumn( this.searchOptionValue, this.searchTextValue )
  //     .subscribe( customers => this.customers = customers );
  // }
  
  // getSaleDevolutionByColumn() {
  //   this.saleProductService.findByColumn( this.searchOptionValue, this.searchTextValue )
  //     .subscribe( salesProduct => {
  //       this.salesProduct =  salesProduct.filter( saleProduct => {
  //         return saleProduct.type === 'CONTADO' && saleProduct.state === 'REGISTRADO';
  //       })
  //     });
  // }

  // getSalePaymentByColumn() {
  //   this.saleProductService.findByColumn( this.searchOptionValue, this.searchTextValue )
  //     .subscribe( salesProduct => {
  //       this.salesProduct =  salesProduct.filter( saleProduct => {
  //         return saleProduct.type === 'CRÉDITO' && saleProduct.state === 'REGISTRADO' && (saleProduct.total - saleProduct.total_payment) != 0;
  //       })
  //     });
  // }

  // onKeyUp( searchTextValue ) {
  //   this.subject.next(searchTextValue);
  // }

}
