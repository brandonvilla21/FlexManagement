import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from './../../../../product/services/product.service';
import { Product } from './../../../../product/product.model';
import { EmployeeService } from './../../../../employee/services/employee/employee.service';
import { SaleProductInterface } from './../../../sale/models/sale-product.model';
import { Employee } from './../../../../employee/employee.model';
import { SearchModalComponent } from './../../../../shared/search-modal/search-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';
import { PaymentInterface } from './../../models/payment.model';
import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.scss']
})
export class PaymentCreateComponent implements OnInit {

  public payment: PaymentInterface = {
    payment_id: '',
    sale_id: '',
    employee_id: '',
    payment_amount: 0,
    payment_date: new Date()
  };
  public employeeForm: Employee = {
    employee_id: '',
    name: '',
    lastname: '',
    address: '',
    whatsapp: '',
  };
  public saleProductForm: SaleProductInterface = {
    sale_id: '',
    customer_id: '',
    employee_id: '',
    sale_date: new Date('01-01-0000'),
    type: '',
    state: '',
    subtotal: 0,
    discount: 0,
    total: 0,
    total_payment: 0,
    product_saleProduct: []
  };

  productsTable: any[] = [];
  public employeeName = '';
  public employeeContact = '';

  public currentDate: any;


  constructor(
    private paymentService: PaymentService,
    private dialogService: DialogService,
    private employeeService: EmployeeService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPaymentCount();
    this.getDate();
  }

  getPaymentCount() {
    this.paymentService.count()
      .subscribe( res => this.payment.payment_id = res[0].number_of_payments + 1 );
  }

  getDate() {
    this.currentDate = Observable.interval(1000).map(x => new Date()).share();
  }

  onSubmitPayment( form: NgForm) {
    if ( form.valid ) {
      this.paymentService.create( this.payment )
        .subscribe( res => {
          console.log('res: ', res);
          this.router.navigate(['/processes/payments/all']);
        });
    }
  }

  showModalSearch(type: string, title: string) {
    const disposable = this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title,
    }).subscribe( data => {
      if (data) {
        switch (type) {
          case 'employee':
            this.employeeForm = data;
            this.payment.employee_id = this.employeeForm.employee_id;
            break;
          case 'sale_product_for_payment':
            this.saleProductForm = data;
            this.payment.sale_id = this.saleProductForm.sale_id;
            // this.payment.total_returned = this.saleProductForm.total;
            // To fill Employee's data
            this.employeeService.findById( this.saleProductForm.employee_id )
              .subscribe( employee => {
                this.employeeName = `${employee[0].name} ${employee[0].lastname}`;
                this.employeeContact = employee[0].whatsapp;
              });
            // To fill Table in template
            this.saleProductForm.product_saleProduct.forEach( productForm => {
              this.productService.findById( productForm.product_id )
                .subscribe( product => {
                  this.productsTable.length = 0;
                  this.productsTable.push({
                    product_id: productForm.product_id,
                    description: product[0].description,
                    sale_price: productForm.price,
                    saleExistence: productForm.amount,
                  })
                })
            });
            break;
        }
      }
    });
  }

  isValidPaymentAmout() {
      return this.payment.payment_amount && (this.payment.payment_amount <= this.saleProductForm.total - this.saleProductForm.total_payment)
  }

}
