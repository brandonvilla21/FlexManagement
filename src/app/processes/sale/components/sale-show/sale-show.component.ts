import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './../../../../employee/employee.model';
import { Customer } from './../../../../customer/customer.model';
import { Product } from './../../../../product/product.model';
import { EmployeeService } from './../../../../employee/services/employee/employee.service';
import { CustomerService } from './../../../../customer/services/customer/customer.service';
import { ProductService } from './../../../../product/services/product.service';
import { Observable } from 'rxjs/Observable';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { DialogService } from 'ng2-bootstrap-modal';
import { ProductSaleProductInterface } from '../../models/product-sale-product.model';
import { SearchModalComponent } from './../../../../shared/search-modal/search-modal.component';
import { SaleProductInterface } from '../../models/sale-product.model';
import { SaleProductService } from './../../services/sale-product.service';

@Component({
  selector: 'app-sale-show',
  templateUrl: './sale-show.component.html',
  styleUrls: ['./sale-show.component.scss']
})
export class SaleShowComponent implements OnInit {

  public product: Product;
  public employee: Employee;
  public customer: Customer;
  public saleProduct: SaleProductInterface;

  constructor(
    private productService: ProductService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private saleProductService: SaleProductService
   ){ }

  ngOnInit() {
    // this.getSale();
  }

  getSale() {
    this.saleProductService.findById('1').subscribe( saleProduct => {
      // this.saleProduct = saleProduct
      console.log(saleProduct);
    } );
  }

  // getProduct() {
  //   this.productService.all()
  //     .subscribe( product => this.product = product );
  // }

  // getEmployee() {
  //   this.employeeService.all()
  //     .subscribe( employee => this.employee = employee );
  // }

  // getCustomer() {
  //   this.customerService.all()
  //     .subscribe( customer => this.customer = customer );
  // }

}
