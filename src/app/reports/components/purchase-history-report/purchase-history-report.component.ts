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

  download() {
    if (this.isValidForm())
      switch (this.columnOption) {
        case 'provider_id': this.generateProviderPDF(); break;
        // case 'all':     this.generateGeneralSalesPDF(); break;
      }
  }


  generateProviderPDF(){
    let columns = [ 'ID', 'FECHA', 'SUBTOTAL', 'DESCUENTO', 'TOTAL'];
    let rows = [];
    let subtotal = 0;
    let discount = 0;
    let total = 0;

    this.purchasesProvider.forEach( purchase => {

      rows.push([
        purchase.purchase_id || '',
        // purchase.provider_name || '',
        // purchase.provider_description || '',
        purchase.purchase_date ? new Date(purchase.purchase_date).toLocaleDateString() : '',
        purchase.subtotal ,
        purchase.discount,
        purchase.total,
      ])
      subtotal += purchase.subtotal;
      discount += purchase.discount;
      total += purchase.total;
    })

    rows.push(['', '', '', '', '']);
    rows.push(['', 'TOTAL', subtotal, discount, total]);

    const fromDate = `DESDE: ${this.fromDate}`;
    const toDate = `HASTA: ${this.toDate}`;
    const name = `PROVEEDOR: ${this.provider.name}`

    this.ng2PdfService.pdfTableWithDates(
      columns, rows, 'HISTORIAL DE COMPRAS A UN PROVEEDOR EN UN PERÍODO', fromDate, toDate, name, '', 'Historial de compras por proveedor.pdf', true);
  }


  isValidForm() {
    return (this.fromDate && this.toDate) && (this.id_search || this.columnOption == 'all');
  }

}
