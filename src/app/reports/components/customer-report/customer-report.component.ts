import { ReportsService } from './../../services/reports.service';
import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';
import { Customer } from './../../../customer/customer.model';
import { Component, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

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
    private ng2PdfService: Ng2PdfService,
    private reportsService: ReportsService
  ) {
    this.customers = [];
   }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.reportsService.getTabeData( 'customer ')
      .subscribe( res => this.customers = res );
  }

  download() {

    const columns = [ 'ID', 'NOMBRE', 'APELLIDO(S)', 'REFERENCIA', 'WHATSAPP', 'FACEBOOK', 'SALDO'];
    const rows = [];
    let total = 0;
    this.customers.forEach( customer => {
      rows.push([
        customer.customer_id,
        customer.name || '',
        customer.lastname || '',
        customer.reference || '',
        customer.whatsapp || '',
        customer.facebook || '',
        customer.balance,
      ])
      total += customer.balance;
    })
    rows.push([ '', '', '', '', '', 'TOTAL', total]);

    // Set the date to PDF
    const date = 'Fecha: ' + new Date().toLocaleDateString();

    this.ng2PdfService.pdfTableDate( columns, rows, 'LISTA DE CLIENTES', 'Clientes.pdf', date );
  }

  downloadCSV() {

    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      headers: Object.keys(this.customers[0]),
      useBom: true
    };
   
     
    new Angular2Csv(this.customers, 'Reporte de clientes', options);
  }

}
