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
import { Router } from '@angular/router';


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
    saleExistence: 0
  }

  public saleProduct: SaleProductInterface = {
    sale_id: null,
    customer_id: '',
    employee_id: '',
    sale_date: new Date(),
    type: 'CONTADO',
    state: 'REGISTRADO',
    subtotal: 0,
    discount: 0,
    total: 0,
    total_payment: 0,
    product_saleProduct: [],
  }

  constructor(
    private dialogService: DialogService,
    private productService: ProductService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private saleProductService: SaleProductService,
    private router: Router
   ) {
      this.getEmployees();
      this.getProducts();
      this.getCustomers();
      this.getSaleCount();
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

  private getSaleCount() {
    this.saleProductService.count()
      .subscribe( res => this.saleProduct.sale_id = res[0].number_of_sale + 1 );
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
      product.saleExistence = this.numberOfProducts;
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
        saleExistence: product.saleExistence ,
      });

      this.calculateCosts( product.sale_price * product.saleExistence )

      this.productForm.product_id = '';
      this.productForm.description = '';
      this.productForm.brand = '';
      this.productForm.sale_price = 0;
      this.numberOfProducts = 1;
    } else {
      // It has not selected any product
    }

  }

  calculateCosts( subtotal ) {
    this.subtotal += subtotal;
    this.total = this.subtotal - this.discount;
  }

  calculateTotal() {
    this.total = this.subtotal - this.discount;
  }

  addSaleProduct(product) {
    this.soldProducts.push(product);
    this.behaviorSubject.next(this.soldProducts);
  }

  removeFromSold( product_id ) {
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

  onSubmitSale ( form: NgForm ) {
    this.saleProduct.customer_id = this.customerForm.customer_id;
    this.saleProduct.employee_id = this.employeeForm.employee_id;
    this.saleProduct.subtotal = this.subtotal;
    this.saleProduct.discount = this.discount;
    this.saleProduct.total = this.total;
    this.soldProducts.forEach( product => {
      this.saleProduct.product_saleProduct.push({
        sale_id: this.saleProduct.sale_id,
        product_id: product.product_id,
        price: product.sale_price,
        amount: product.saleExistence,
      });
    });
    this.insertPurchase();
  }

  private insertPurchase () {
    this.saleProductService.create( this.saleProduct )
      .subscribe( res => {
        console.log( res );
        this.router.navigate(['/processes/sales/all']);
      } );
  }

  getDate() {
    this.currentDate = Observable.interval(1000).map(x => new Date()).share();
  }
}
