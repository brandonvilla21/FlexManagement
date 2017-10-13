import { ReportsService } from './../../services/reports.service';
import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';
import { Customer } from './../../../customer/customer.model';
import { CustomerService } from './../../../customer/services/customer/customer.service';
import { Component, OnInit } from '@angular/core';
declare var jsPDF: any; // Important

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss'],
  providers: [
  ]
})
export class CustomerReportComponent implements OnInit {
  public customers: Customer[];
  constructor(
    private customerService: CustomerService,
    private ng2PdfService: Ng2PdfService,
    private reportsService: ReportsService
  ) {
    this.customers = [];
   }

  ngOnInit() {
    this.getCustomers();
  }
  
  getCustomers() {
    this.reportsService.getCustomers()
      .subscribe( res => {this.customers = res, console.log(res)});
  }

  download() {

    const columns = [ 'ID', 'NOMBRE', 'APELLIDO(S)', 'REFERENCIA', 'WHATSAPP', 'FACEBOOK', 'SALDO'];
    const rows = [];

    this.customers.forEach( customer => {
      rows.push([
        customer.customer_id,
        customer.name || '',
        customer.lastname || '',
        customer.reference || '',
        customer.whatsapp || '',
        customer.facebook || '',
        customer.balance || '',
      ])
    })

    this.ng2PdfService.pdfTable( columns, rows, 'LISTA DE CLIENTES', 'Clientes.pdf' );
  }

}
