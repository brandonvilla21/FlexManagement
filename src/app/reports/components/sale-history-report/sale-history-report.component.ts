import { Employee } from './../../../employee/employee.model';
import { Customer } from './../../../customer/customer.model';
import { SearchModalComponent } from './../../../shared/search-modal/search-modal.component';
import { Router } from '@angular/router';
import { PaymentService } from './../../../processes/payment/services/payment.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from './../services/reports.service';
import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';

@Component({
  selector: 'app-sale-history-report',
  templateUrl: './sale-history-report.component.html',
  styleUrls: ['./sale-history-report.component.scss']
})
export class SaleHistoryReportComponent implements OnInit {
  public sales: any[];
  public columnOption: String = 'employee_id';
  public fromDate: Date;
  public toDate: Date;
  public reportTitle: String;

  public customer: Customer = {
    customer_id: '',
    name: '',
    lastname: '',
    reference: '',
    whatsapp: '',
    facebook: '',
    balance: 0
  }

  public employee: Employee = {
    employee_id: '',
    name: '',
    lastname: '',
    address: '',
    whatsapp: ''
  }
  constructor( private reportsService: ReportsService, private ng2PdfService: Ng2PdfService,
    private dialogService: DialogService, private router: Router
  ) { 
    this.sales = [];
  }

  ngOnInit() {
    this.getSales();
  }
  
  getSales() {
    this.reportsService.salesHistoryByColumnInAPeriod({
      fromDate: '2010-10-10',
      toDate: '2017-11-11',
      column: 'employee_id',
      id: 1
    }).subscribe( sales => {
      this.sales = sales;
      console.log('this.sales: ', this.sales);
    });
  }

  showModalSearch( type: string, title: string) {
    this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title
    }).subscribe( data => {
      if ( data ) {
        switch ( type ) {
          case 'customer': this.customer = data; break;
          case 'employee': this.employee = data; break;
        }
      }
    })
  }

  seeValues(){
    console.log("columnOption", this.columnOption);
  }



}
