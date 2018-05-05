import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../employee/employee.model';
import { ReportsService } from '../../services/reports.service';
import { Ng2PdfService } from '../../../shared/ng2-pdf/ng2-pdf.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { SearchModalComponent } from '../../../shared/search-modal/search-modal.component';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-payment-by-employee-report',
  templateUrl: './payment-by-employee-report.component.html',
  styleUrls: ['./payment-by-employee-report.component.scss']
})
export class PaymentByEmployeeReportComponent implements OnInit {

  public employee: Employee;
  public payments: any[] = [];

  constructor(
    private reportsService: ReportsService, 
    private ng2PdfService: Ng2PdfService,
    private dialogService: DialogService
  ) { 

    this.employee = { employee_id: '', name: '', lastname: '', address: '', whatsapp: '' };

  }

  ngOnInit() {
    
  }

  showModalSearch( type: string, title: string) {
    this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title
    }).subscribe( data => {
      if ( data ) 

        switch ( type ) {
          case 'employee': this.employee = data; this.getPaymentsByEmployee(); break;
        }

    })
  }

  getPaymentsByEmployee() {
    this.reportsService.getPaymentsByEmployee(this.employee.employee_id)
      .subscribe(payments => this.payments = payments);
  }

  downloadPDF() {

    const columns = [ 'ID ABONO', 'ID VENTA', 'FECHA DE ABONO', 'CANTIDAD DE ABONO'];
    const rows = [];
    this.payments.forEach( payment => {
      rows.push([
        payment.payment_id,
        payment.sale_id,
        new Date(payment.payment_date).toLocaleDateString(),
        payment.payment_amount >= 0 ? payment.payment_amount : 0,
      ])
    })

    // Set the date to PDF
    const date = 'Fecha: ' + new Date().toLocaleDateString();

    this.ng2PdfService.pdfTableDate( 
      columns, 
      rows, 
      `Abonos del empleado: ${this.employee.name} ${this.employee.lastname}`, 
      'Abonos por empleado.pdf', 
      date 
    );
  }

  downloadCSV() {

    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      headers: Object.keys(this.payments[0]),
      useBom: true
    };
   
     
    new Angular2Csv(this.payments, 'Reporte de abonos por empleado', options);
  }

}
