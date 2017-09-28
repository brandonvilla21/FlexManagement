import { PaymentInterface } from './../../models/payment.model';
import { EmployeeService } from './../../../../employee/services/employee/employee.service';
import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  public payments: any[];

  constructor(
    private paymentService: PaymentService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.getPayments();
  }

  getPayments() {
    this.paymentService.general()
      .subscribe( payments => {
        console.log(payments);
        this.payments = payments
      });
  }

}
