import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';
import { ReportsService } from './../../services/reports.service';
import { Component, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv';

@Component({
  selector: 'app-missing-products',
  templateUrl: './missing-products.component.html',
  styleUrls: ['./missing-products.component.scss']
})
export class MissingProductsComponent implements OnInit {
  public products: any;
  constructor(
    private reportsService: ReportsService,
    private ng2PdfService: Ng2PdfService,
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.reportsService.getMissingProductsByMin()
      .subscribe( res => this.products = res);
  }

  downloadCSV() {

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      headers: Object.keys(this.products[0]),
      useBom: true
    };

    // tslint:disable-next-line:no-unused-expression
    new Angular2Csv(this.products, 'Reporte de productos más vendidos', options);
  }

  downloadPDF() {

    const columns = [
      'ID', 'DESCRIPCIÓN', 'MARCA', 'SABOR', 'PRECIO DE COMPRA', 'PRECIO DE VENTA',
      'EXISTENCIAS', 'Min'
    ];
    const rows = [];
    this.products.forEach( product => {
      rows.push([
        product.product_id,
        product.description || '',
        product.brand || '',
        product.flavor || '',
        product.buy_price >= 0 ? product.buy_price : 0,
        product.sale_price >= 0 ? product.sale_price : 0,
        product.existence >= 0 ? product.existence : 0,
        product.min >= 0 ? product.min : 0,
      ])
    })

    // Set the date to PDF
    const date = 'Fecha: ' + new Date().toLocaleDateString();

    this.ng2PdfService.pdfTableDate( columns, rows, 'PRODUCTOS FALTANTES DE ACUERDO A MINIMOS', 'Productos_faltantes.pdf', date );
  }

}
