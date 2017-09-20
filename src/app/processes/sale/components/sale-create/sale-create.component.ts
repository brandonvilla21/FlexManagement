import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './../../../../employee/employee.model';
import { Customer } from './../../../../customer/customer.model';
import { Product } from './../../../../product/product.model';
import { EmployeeService } from './../../../../employee/services/employee/employee.service';
import { CustomerService } from './../../../../customer/services/customer/customer.service';
import { ProductService } from './../../../../product/services/product.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from 'ng2-bootstrap-modal';
import { ProductSaleProductInterface } from '../../models/product-sale-product.model';
import { SearchModalComponent } from './../../../../shared/search-modal/search-modal.component';
import { SaleProductInterface } from '../../models/sale-product.model';
import { SaleProductService } from './../../services/sale-product.service';

// import { ProductConfirmComponent } from './../product-confirm/product-confirm.component';
// Things missing
// Get the ID Compra
// Delete product from saled product table button

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.scss']
})
export class SaleCreateComponent implements OnInit {
  public numberOfProducts = 1;
  public currentDate;
  public products: Product[];
  public employees: Employee[];
  public customers: Customer[];
  public soldProducts: Product[] = [];
  public behaviorSubject: BehaviorSubject<Array<Product>>;
  public latestSoldProducts: Observable<Array<Product>>;
  public subtotal = 0;
  public discount = 0;
  public total = 0;
  public employeeForm: Employee = {
    employee_id: '',
    name: '',
    lastname: '',
    address: '',
    whatsapp: ''
  };

  public customerForm: Customer = {
    customer_id: '',
    name: '',
    lastname: '',
    reference: '',
    whatsapp: '',
    facebook: '',
    balance: 0
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

  public saleProduct: SaleProductInterface = {
    sale_id: '',
    provider_id: '',
    sale_date: new Date(),
    subtotal: 0,
    discount: 0,
    total: 0,
    product_saleProduct: [],
  }

  constructor(
    private dialogService: DialogService,
    private productService: ProductService,
    private employeeService: EmployeeService,
    private customerService: CustomerService
   ) {
      this.getEmployees();
      this.getProducts();
      this.getCustomers();
    }

  ngOnInit() {

    this.getDate();
    this.behaviorSubject = new BehaviorSubject<Array<Product>>(this.soldProducts);
    this.latestSoldProducts = this.behaviorSubject.map( data => data.map(
      d => {
        return d;
      }));
  }

  getProducts() {
    this.productService.all()
      .subscribe( products => this.products = products );
  }

  getEmployees() {
    this.employeeService.all()
      .subscribe( employees => this.employees = employees );
  }

  getCustomers() {
    this.customerService.all()
      .subscribe( customers => this.customers = customers );
  }

  showModalSearch(type: string, title: string) {
    const disposable = this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title,
    }).subscribe( data => {
      if (data) {
        switch (type) {
          case 'employee': this.employeeForm = data; break;
          case 'product':  this.productForm = data;  break;
          case 'customer':  this.customerForm = data;  break;
        }
      }
    });
  }

  addProductToTable( product: Product ) {
    if ( product.product_id !== '' ) {
      product.purchaseExistence = this.numberOfProducts;
      this.addSaleProduct({ // If I pass product variable, it will cause some errors in lines 120, 121 and 122
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
      this.subtotal += product.buy_price * product.purchaseExistence;
      if ( this.subtotal >= 5000 ) {
        this.discount = this.subtotal * .10;
      }
      this.total = this.subtotal - this.discount;
      this.productForm.product_id = '';
      this.productForm.description = '';
      this.productForm.brand = '';
      this.productForm.buy_price = 0;
      this.numberOfProducts = 1;
    } else {
      // It has not selected any product
    }

  }

  addSaleProduct(product) {
    this.soldProducts.push(product);
    this.behaviorSubject.next(this.soldProducts);
  }

  removeFromSaled( product_id ) {
    const productToDelete = this.soldProducts.filter( product => {
      if ( product.product_id === product_id ) {
        return product;
      }
    });
    const index = this.soldProducts.indexOf(productToDelete[0]);
    this.soldProducts.splice(index, 1);
    // Call the observable
    this.behaviorSubject.next(this.soldProducts);
  }
  getDate() {
    this.currentDate = Observable.interval(1000).map(x => new Date()).share();
  }
}
