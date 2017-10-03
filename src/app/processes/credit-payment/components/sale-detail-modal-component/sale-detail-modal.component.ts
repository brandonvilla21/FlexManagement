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

export interface SaleDetailModalInterface {
  sale_id: string
}

@Component({
  selector: 'app-sale-detail-modal-component',
  templateUrl: './sale-detail-modal.component.html',
  styleUrls: ['./sale-detail-modal.component.scss'],
  providers: [
    SaleProductService
  ]
})
export class SaleDetailModalComponent extends DialogComponent<SaleDetailModalInterface, any> implements OnInit, SaleDetailModalInterface {
  public employee: Employee;
  public customer: Customer;
  public sale: SaleProductInterface;
  
  public products: Product[];
  private subject: BehaviorSubject<string>;

  sale_id: string;

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

    this.getSaleProduct( this.sale_id )
    
    .flatMap( sale => {
      this.sale = sale;
      console.log('this.sale: ', this.sale);
      return this.getCustomer( this.sale.customer_id );
    })
    
    .flatMap( customer => {
      this.customer = customer[0]
      console.log('this.customer: ', this.customer);
      return this.getEmployee( this.sale.employee_id );
    })

    .subscribe( employee => {
      this.employee = employee[0];
      console.log('this.employee: ', this.employee);
    }, error => console.log(error), () => console.log('Success!'))
    
  }

  confirm( object: any ) {
    this.result = object; // result is passed to subscribe method from addDialog observer
    this.close();
  }

  getEmployee(id) { return this.employeeService.findById(id) }

  getCustomer(id) { return this.customerService.findById(id) }

  getSaleProduct(id) { return this.saleProductService.findById(id) }


  getProduct(id, value) {
    this.productService.findByColumn(id, value)
      .subscribe( products => this.products = products);
  }
}
