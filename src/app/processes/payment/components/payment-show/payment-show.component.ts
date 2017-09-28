import { ProductService } from './../../../../product/services/product.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../../../../employee/services/employee/employee.service';
import { PaymentService } from './../../services/payment.service';
import { SaleProductInterface } from './../../../sale/models/sale-product.model';
import { SaleProductService } from './../../../sale/services/sale-product.service';
import { Employee } from './../../../../employee/employee.model';
import { PaymentInterface } from './../../models/payment.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-show',
  templateUrl: './payment-show.component.html',
  styleUrls: ['./payment-show.component.scss'],
  providers: [
    SaleProductService
  ]
})
export class PaymentShowComponent implements OnInit {

  public payment: PaymentInterface = {
    payment_id: '',
    sale_id: '',
    employee_id: '',
    payment_amount: 0,
    payment_date: new Date()
  }
  public employeePayment: Employee = {
    employee_id: '',
    name: '',
    lastname: '',
    address: '',
    whatsapp: ''
  }
  public employeeSaleProduct: Employee = {
    employee_id: '',
    name: '',
    lastname: '',
    address: '',
    whatsapp: ''
  }

  public saleProduct: SaleProductInterface = {
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
  public table = [];

  constructor(
    private paymentService: PaymentService,
    private employeeService: EmployeeService,
    private saleProductService: SaleProductService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { 

    this.activatedRoute.params.subscribe( params => {
      this.payment.payment_id = params['id'];
    })

  }

  ngOnInit() {

    this.paymentService.findById( this.payment.payment_id )
    .flatMap(  payment => {
      console.log('payment: ', payment);
      this.payment = payment[0]
      return this.employeeService.findById( this.payment.employee_id )
    })
    .flatMap( employeePayment => {
      console.log('employeePayment: ', employeePayment);
      this.employeePayment = employeePayment[0]
      return this.saleProductService.findById( this.payment.sale_id )
    })
    .flatMap( saleProduct => {
      console.log('saleProduct: ', saleProduct);
      this.saleProduct = saleProduct;
      this.fillTable()
      return this.employeeService.findById( this.saleProduct.employee_id )
    })
    .subscribe( employeeSaleProduct => {
      this.employeeSaleProduct = employeeSaleProduct[0]
    },
    error => console.log(error),
    () => {
      console.log('Success!')
    })

  }

  fillTable() {
    this.saleProduct.product_saleProduct.forEach( productForm => {
      this.productService.findById( productForm.product_id )
        .subscribe( product => {
          this.table.push({
            product_id: productForm.product_id,
            description: product[0].description,
            sale_price: productForm.price,
            saleExistence: productForm.amount,
          })
        })
    });
   }

   paymentState(){
    return (this.saleProduct.total - this.saleProduct.total_payment) ? 'EN PROCESO DE PAGO' : 'PAGADO';
   }


}
