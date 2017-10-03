import { Router } from '@angular/router';
import { PaymentService } from './../../../payment/services/payment.service';
import { NgForm } from '@angular/forms';
import { Employee } from './../../../../employee/employee.model';
import { CreditPaymentInterface } from './../../../payment/components/models/credit-payment.model';
import { SaleProductInterface } from './../../../sale/models/sale-product.model';
import { SaleProductService } from './../../../sale/services/sale-product.service';
import { Customer } from './../../../../customer/customer.model';
import { SearchModalComponent } from './../../../../shared/search-modal/search-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-payment-create',
  templateUrl: './credit-payment-create.component.html',
  styleUrls: ['./credit-payment-create.component.scss'],
  providers: [
    SaleProductService,
    PaymentService
  ]
})
export class CreditPaymentCreateComponent implements OnInit {
  public customer: Customer = {
    customer_id: '',
    name: '',
    lastname: '',
    reference: '',
    whatsapp: '',
    facebook: '',
    balance: 0
  }
  public saleSelected: SaleProductInterface = {
    sale_id: '',
    customer_id: '',
    employee_id: '',
    sale_date: new Date(),
    type: '',
    state: '',
    subtotal: 0,
    discount: 0,
    total: 0,
    total_payment: 0,
    product_saleProduct: []
  }
  public creditPayment: CreditPaymentInterface = {
    payment_id: '',
    sale_id: '',
    employee_id: '',
    payment_amount: 0,
    payment_date: new Date()
  }
  public employee: Employee = {
    employee_id: '',
    name: '',
    lastname: '',
    address: '',
    whatsapp: ''
  }
  public salesProduct: SaleProductInterface[] = []

  constructor(
    private dialogService: DialogService,
    private saleProductService: SaleProductService,
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPaymentCount();
  }
  getPaymentCount() {
    this.paymentService.count()
      .subscribe( res => this.creditPayment.payment_id = res[0].number_of_payments + 1 );
  }

  setSale( saleProduct: SaleProductInterface ) {
    this.saleSelected = saleProduct;
  }
  getBalance() {
    this.saleProductService.findByColumn( 'customer_id', this.customer.customer_id )
      .subscribe( res =>  this.salesProduct = res )
  }
  details( saleProduct: SaleProductInterface ) {
    // this.dialogService.addDialog(SaleDetailModalComponent, {
    //   saleProduct: saleProduct
    // });
  }
  showModalSearch( type: string, title: string) {
    this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title
    }).subscribe( data => {
      if ( data ) {
        switch ( type ) {
          case 'customer':
            this.customer = data;
            this.getBalance();
            break;
          case 'employee':
            this.employee = data;
            break;
        }
      }
    })
  }

  isValidPaymentAmount() {
    return this.saleSelected.total <= this.creditPayment.payment_amount;
  }

  onSubmitCreditPayment( form: NgForm ) {
    if ( form.valid ) {
      this.creditPayment.payment_date.toLocaleString()
      this.creditPayment.employee_id = this.employee.employee_id
      this.creditPayment.sale_id = this.saleSelected.sale_id
      this.paymentService.create( this.creditPayment )
        .subscribe( res => {
          if (res === 'success') {
            this.router.navigate(['/processes/payments/all']);
          }
        });
    }
  }

}
