import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchModalComponent } from './../../shared/search-modal/search-modal.component';
import { Employee } from './../../employee/employee.model';
import { Product } from './../../product/product.model';
import { EmployeeService } from './../../employee/services/employee/employee.service';
import { ProductService } from './../../product/services/product.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from 'ng2-bootstrap-modal';
import { ProductConfirmComponent } from './../product-confirm/product-confirm.component';
// Things missing
// Get the ID Compra
// Delete product from purchased product table button

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  public numberOfProducts = 1;
  public currentDate;
  public products: Product[];
  public employees: Employee[];
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

  constructor(
    private dialogService: DialogService,
    private productService: ProductService,
    private employeeService: EmployeeService
   ) {
      this.getEmployees();
      this.getProducts();
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
  showModalSearch(type: string, title: string) {
    const disposable = this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title,
    }).subscribe( data => {
      if (data) {
        if (type === 'employee') {
          this.employeeForm = data;
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

  addPurchaseProduct(product) {
    this.soldProducts.push(product);
    this.behaviorSubject.next(this.soldProducts);
  }

  removeFromPurchased( product_id ) {
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
