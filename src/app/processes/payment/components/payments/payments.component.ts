import { PaymentInterface } from './../../models/payment.model';
import { EmployeeService } from './../../../../employee/services/employee/employee.service';
import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

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

  downloadCSV() {
    
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      headers: Object.keys(this.payments[0]),
      useBom: true
    };
   
     
    new Angular2Csv(this.payments, 'Proceso de abonos', options);
  }

}
