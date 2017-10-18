import { Provider } from './../../../provider/provider.model';
import { SearchModalComponent } from './../../../shared/search-modal/search-modal.component';
import { Router } from '@angular/router';
import { PaymentService } from './../../../processes/payment/services/payment.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from './../../services/reports.service';
import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';

@Component({
  selector: 'app-purchase-history-report',
  templateUrl: './purchase-history-report.component.html',
  styleUrls: ['./purchase-history-report.component.scss']
})
export class PurchaseHistoryReportComponent implements OnInit {

  public purchasesProvider: any[];
  public purchasesAll: any[];
  public columnOption: String = 'all';
  public fromDate: Date;
  public toDate: Date;
  public id_search: String;

  public provider: Provider;

  constructor( private reportsService: ReportsService, private ng2PdfService: Ng2PdfService,
               private dialogService: DialogService, private router: Router
  ) { 

  }

  ngOnInit() {
    this.setValues();
    
  }

  setValues(){
    this.provider = { name: '', description: '', contact: '', email: '', phone: '', provider_id: '' };
    this.purchasesProvider = [];
    this.purchasesAll = [];
    this.id_search = '';
    this.loadSalesTables();
  }

  showModalSearch( type: string, title: string) {
    this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title
    }).subscribe( data => {
      if ( data ) {
        switch ( type ) {
          case 'provider': this.provider = data; this.id_search = this.provider.provider_id; break;
        }

        this.loadSalesTables();

      }
    })
  }

  loadSalesTables() {
    if(this.isValidForm()) {

      if(this.columnOption == 'all')
        this.id_search = '0';

      this.reportsService.purchaseHistoryByColumnInAPeriod({ 
        fromDate: this.fromDate, toDate: this.toDate, column: this.columnOption,  id: this.id_search })
      .subscribe( purchases => {
        switch( this.columnOption ){
          case 'provider_id': this.purchasesProvider = purchases; console.log('this.purchasesProvider: ', this.purchasesProvider); break;
          case 'all':         this.purchasesAll      = purchases; console.log('this.purchasesAll: ', this.purchasesAll);           break;
        }
      });
    } else {
      console.log("No entró al if.")
    }
    
  }

  // download() {
  //   if (this.isValidForm())
  //     switch (this.columnOption) {
  //       case 'customer_id': this.generateProviderPDF(); break;
  //       case 'all':     this.generateGeneralSalesPDF(); break;
  //     }
  // }


  // generateProviderPDF(){
  //   let columns = [ 'ID', 'EMPLEADO', 'FECHA', 'ESTADO', 'TIPO', 'SUBTOTAL', 'DESCUENTO', 'TOTAL'];
  //   let rows = [];
  //   let subtotal = 0;
  //   let discount = 0;
  //   let total = 0;

  //   this.purchasesCustomer.forEach( purchase => {

  //     rows.push([
  //       purchase.purchase_id || '',
  //       purchase.employee_name && purchase.employee_lastname ? `${purchase.employee_name} ${purchase.employee_lastname}` : '',
  //       purchase.purchase_date ? new Date(purchase.purchase_date).toLocaleDateString() : '',
  //       purchase.state || '',
  //       purchase.type || '',
  //       purchase.subtotal ,
  //       purchase.discount,
  //       purchase.total,
  //     ])
  //     subtotal += purchase.subtotal;
  //     discount += purchase.discount;
  //     total += purchase.total;
  //   })

  //   rows.push(['', '', '', '', '', '', '', '', '']);
  //   rows.push(['', '', '', '', 'TOTAL', subtotal, discount, total]);

  //   rows = this.removeTypeRows(rows);
  //   columns = this.removeTypeColumns(columns);

  //   const fromDate = `DESDE: ${this.fromDate}`;
  //   const toDate = `HASTA: ${this.toDate}`;
  //   const customerName = `CLIENTE: ${this.customer.name} ${this.customer.lastname}`
  //   const purchaseType = `TIPO: ${this.purchaseType}`

  //   this.ng2PdfService.pdfTableWithDates(
  //     columns, rows, 'HISTORIAL DE VENTAS A UN CLIENTE EN UN PERÍODO', fromDate, toDate, customerName, purchaseType, 'Historial de Ventas por cliente.pdf');
  // }


  isValidForm() {
    return (this.fromDate && this.toDate) && (this.id_search || this.columnOption == 'all');
  }

}
