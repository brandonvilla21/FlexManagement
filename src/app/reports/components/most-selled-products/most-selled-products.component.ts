import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { Product } from '../../../product/product.model';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';

@Component({
  selector: 'app-most-selled-products',
  templateUrl: './most-selled-products.component.html',
  styleUrls: ['./most-selled-products.component.scss']
})
export class MostSelledProductsComponent implements OnInit {

  public numberOfProducts = 10;
  public products: any[];

  constructor(
    private ng2PdfService: Ng2PdfService,
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.getMostSelledProducts();
  }

  getMostSelledProducts() {
    this.reportsService.getMostSelledProducts( this.numberOfProducts )
      .subscribe( res => { this.products = res });
  }

  refresh() {
    this.getMostSelledProducts();
  }

  downloadPDF() {

    const columns = [ 
      'ID', 'DESCRIPCIÓN', 'MARCA', 'SABOR', 'PRECIO DE COMPRA', 'PRECIO DE VENTA',
      'EXISTENCIAS', 'UNIDADES VENDIDAS'
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
        product.selledUnits >= 0 ? product.selledUnits : 0,
      ])
    })

    // Set the date to PDF
    const date = 'Fecha: ' + new Date().toLocaleDateString();

    this.ng2PdfService.pdfTableDate( columns, rows, 'PRODUCTOS MÁS VENDIDOS', 'Productos_mas_vendidos.pdf', date );
  }

  downloadCSV() {

    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      headers: Object.keys(this.products[0]),
      useBom: true
    };
   
     
    new Angular2Csv(this.products, 'Reporte de productos más vendidos', options);
  }

}
