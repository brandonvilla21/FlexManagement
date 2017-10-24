import { SaleProductService } from './../../../processes/sale/services/sale-product.service';
import { SaleProductInterface } from './../../../processes/sale/models/sale-product.model';
import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';
import { ReportsService } from './../../services/reports.service';
import { Customer } from './../../../customer/customer.model';
import { DialogService } from 'ng2-bootstrap-modal';
import { SearchModalComponent } from './../../../shared/search-modal/search-modal.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-status',
  templateUrl: './account-status.component.html',
  styleUrls: ['./account-status.component.scss'],
  providers: [
    SaleProductService
  ]
})
export class AccountStatusComponent implements OnInit {
  public sales: SaleProductInterface[] = [];
  public stateAccount: any[] = [];
  public customer: Customer;
  public stateType: any;
  public year: any;
  public accountState: any;
  public years: any;
  public tableData: any;
  public isDownloadable = false;
  constructor(
    private dialogService: DialogService,
    private reportService: ReportsService,
    private ng2PdfService: Ng2PdfService,
    private saleProductService: SaleProductService
  ) {
    this.customer = {
      customer_id: null,
      name: '',
      lastname: '',
      reference: '',
      whatsapp: '',
      facebook: '',
      balance: 0
    }
    this.accountState = [
      { value: 'ALL', option: 'Todas'},
      { value: 'DEBT', option: 'Ventas en deuda'},
      { value: 'SETTLED', option: 'Ventas liquidadas'}
    ]
    this.stateType = this.accountState[0].value;
    this.years = [
      { value: '2017-01-01', option: '2017'},
      { value: '2018-01-01', option: '2018'}
    ]
    this.year = this.years[0].value;
  }

  ngOnInit() {
  }
  download() {
    const columns = [ 'FECHA', 'REFERENCIA', 'ABONOS', 'CARGOS'];
    const rows = [];
    let totalPayment = 0;
    let totalCharge = 0;
    this.tableData.forEach( element => {
      rows.push([
        element.date ? new Date(element.date).toLocaleDateString() : '',
        element.charge === 0 ? `Abono ID: ${element.reference}` : `Venta ID: ${element.reference}`,
        `$ ${element.payment}`,
        `$ ${element.charge}`
      ])
      totalPayment += element.payment;
      totalCharge += element.charge;
    })

    rows.push(['', '', '', '']);
    rows.push(['', 'TOTAL', '$ ' + totalPayment, '$ ' + totalCharge]);
    // Set the date to PDF
    const date = 'Fecha: ' + new Date().toLocaleDateString();
    let title;
    switch (this.stateType) {
      case 'ALL': title = 'ventas liquidadas y por pagar'; break
      case 'DEBT': title = 'ventas por pagar'; break
      case 'SETTLED': title = 'ventas liquidadas'; break
    }

    this.ng2PdfService.pdfTableDateAccountStatus(
      columns, rows, `Estado de cuenta de ${title}
      \nCliente: ${this.customer.name} ${this.customer.lastname}
      \nContacto: ${this.customer.whatsapp}
      \nSaldo: $${this.customer.balance}`, 'Estado-de-cuenta.pdf', date );
  }
  getStatusAccount() {
    this.saleProductService.findByColumn( 'customer_id', this.customer.customer_id )
    .flatMap( sales => {
      console.log(sales)
      this.sales = sales.filter( sale => {
        return new Date(this.year).getTime() <= new Date(sale.sale_date).getTime() && // From this.year onwards
                sale.type === 'CRÉDITO'  && // All credit sales
                (this.stateType === 'DEBT' // Verify if are debt sales, settled or all
                ? sale.total > sale.total_payment
                : this.stateType === 'SETTLED'
                  ? sale.total === sale.total_payment
                  : true)
      })
      return this.reportService.accountStatus( this.stateType, this.year, this.customer.customer_id)
    })
    .subscribe( stateAccount => stateAccount[0] ? this.fillTable( stateAccount ) : this.tableData = [] )
    this.isDownloadable = true;
  }
  showModalSearch( type: string, title: string) {
    this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title
    })
    .subscribe( data => {
      if ( data ) {
        this.customer = data;
      }
    })
  }
  setStateType( value ) {
    this.stateType = value;
  }
  setYear( value ) {
    this.year = value;
  }
  fillTable( stateAccount ) {
    this.tableData = [];
    console.log(this.sales);
    for (let i = 0; i < this.sales.length; i++) {
      this.tableData.push({
        date: this.sales[i].sale_date,
        reference: this.sales[i].sale_id,
        charge: this.sales[i].total,
        payment: 0
      })
      for (let j = 0; j < stateAccount.length; j++) {
        if ( stateAccount[j].Sale_sale_id === this.sales[i].sale_id ) {
          this.tableData.push({
            date: stateAccount[j].sale_date,
            reference: stateAccount[j].payment_id,
            charge: 0,
            payment: stateAccount[j].payment_amount
          })
        }
      }
    }
  }


}
