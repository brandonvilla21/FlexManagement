import { Employee } from './../../../employee/employee.model';
import { Customer } from './../../../customer/customer.model';
import { SearchModalComponent } from './../../../shared/search-modal/search-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
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
  public columnOption: String;
  public fromDate: Date;
  public toDate: Date;
  public id_search: String;

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
               private dialogService: DialogService, private router: Router, 
               private activatedRoute: ActivatedRoute
  ) { 
    this.sales = [];

  }

  ngOnInit() { 
    this.loadOption();
  }

  loadOption(){
    this.activatedRoute.params.subscribe( params => this.columnOption = params['id'] )
  }

  showModalSearch( type: string, title: string) {
    this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title
    }).subscribe( data => {
      if ( data ) {
        switch ( type ) {
          case 'customer': this.customer = data; this.id_search = this.customer.customer_id; break;
          case 'employee': this.employee = data; this.id_search = this.employee.employee_id; break;
        }

        this.loadSalesTable();

      }
    })
  }

  loadSalesTable() {
    console.log('id: ', this.id_search);
    console.log('this.toDate: ', this.toDate);
    console.log('this.fromDate: ', this.fromDate);
    if(this.fromDate && this.toDate && this.id_search) {
      this.reportsService.salesHistoryByColumnInAPeriod({
        fromDate: this.fromDate,
        toDate: this.toDate,
        column: this.columnOption,
        id: this.id_search
      }).subscribe( sales => {
        this.sales = sales;
        console.log('this.sales: ', this.sales);
      });
    } else {
      console.log("No entró al if.")
    }
    
  }

}
