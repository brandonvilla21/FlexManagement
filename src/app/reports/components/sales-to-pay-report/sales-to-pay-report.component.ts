import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';
import { ReportsService } from './../../services/reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-to-pay-report',
  templateUrl: './sales-to-pay-report.component.html',
  styleUrls: ['./sales-to-pay-report.component.scss']
})
export class SalesToPayReportComponent implements OnInit {
  public sales: any[];
  constructor( private reportsService: ReportsService, private ng2PdfService: Ng2PdfService ) {
    this.sales = [];
   }

  ngOnInit() {
    this.getSalesToPay();
  }
  getSalesToPay() {
    this.reportsService.getSalesToPay()
      .subscribe( res => this.sales = res );
  }

  download() {
    const columns = [ 'ID Venta', 'ID Cliente', 'Cliente', 'ID Empleado', 'Empleado', 'Subtotal', 'Desc', 'Total', 'Abono', 'Deuda' ];
    const rows = [];
    let totalSubtotal = 0;
    let totalDiscount = 0;
    let total = 0;
    let totalPayment = 0;
    let totalDebt = 0;
    this.sales.forEach( sale => {
      rows.push([
        sale.sale_id,
        sale.customer_id,
        sale.customer_name,
        sale.employee_id,
        sale.employee_name,
        sale.subtotal,
        sale.discount,
        sale.total,
        sale.total_payment,
        sale.total - sale.total_payment
      ]);
      totalSubtotal += sale.subtotal;
      totalDiscount += sale.discount
      total += sale.total;
      totalPayment += sale.total_payment;
      totalDebt += sale.total - sale.total_payment;
    });
    rows.push(['', '', '', '', '', '', '', '', '', '']);
    rows.push([ '', '', '', '', 'TOTAL', totalSubtotal, totalDiscount, total, totalPayment, totalDebt]);

    this.ng2PdfService.pdfTable( columns, rows, 'Ventas a crédito por pagar', 'ventas-por-pagar.pdf');

  }

}
