import { Component, OnInit } from '@angular/core';
import { Product } from './../../../product/product.model';
import { ReportsService } from './../services/reports.service';
import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';
declare var jsPDF: any;

@Component({
  selector: 'app-product-list-report',
  templateUrl: './product-list-report.component.html',
  styleUrls: ['./product-list-report.component.scss']
})
export class ProductListReportComponent implements OnInit {
  public products: Product[];

  constructor( private reportsService: ReportsService, private ng2PdfService: Ng2PdfService ) { 
    this.products = [];
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.reportsService.getProducts()
      .subscribe( products => this.products = products );
  }

  download() {
    
        const columns = [ 'ID', 'Descripción', 'Marca', 'Sabor', 
                          'Precio de Compra', 'Precio de Venta', 'Existencias'];
        const rows = [];
    
        this.products.forEach( product => {
          rows.push([
            product.product_id,
            product.description || '',
            product.brand || '',
            product.flavor || '',
            product.buy_price || '',
            product.sale_price || '',
            product.existence || ''
          ])
        })
    
        this.ng2PdfService.pdfTable( columns, rows, 'LISTA DE PRODUCTOS', 'Productos.pdf' );
      }

}
