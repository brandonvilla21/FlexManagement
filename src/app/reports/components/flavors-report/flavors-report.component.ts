import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';
import { Angular2Csv } from 'angular2-csv';
import { ReportsService } from './../../services/reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flavors-report',
  templateUrl: './flavors-report.component.html',
  styleUrls: ['./flavors-report.component.scss']
})
export class FlavorsReportComponent implements OnInit {
  public flavors: any[];
  public numberOfFlavors = 5;
  constructor(
    private reportsService: ReportsService,
    private ng2PdfService: Ng2PdfService,
  ) { }

  ngOnInit() {
    this.getFlavors();
  }

  getFlavors() {
    this.reportsService.getMostWantedFlavors(this.numberOfFlavors)
      .subscribe(res => this.flavors = res);
  }

  refresh() {
    this.getFlavors();
  }

  downloadPDF() {

    const columns = [
      '#', 'SABOR', 'NUMERO DE PRODUCTOS'
    ];
    const rows = [];
    let cont = 1;
    this.flavors.forEach( flavor => {
      rows.push([
        cont++,
        flavor.name || '',
        flavor.products >= 0 ? flavor.products : 0,
      ])
    })

    // Set the date to PDF
    const date = 'Fecha: ' + new Date().toLocaleDateString();

    this.ng2PdfService.pdfTableDate( columns, rows, 'SABORES MÁS VENDIDOS', 'Sabores_mas_vendidos.pdf', date );
  }

  downloadCSV() {

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      headers: Object.keys(this.flavors[0]),
      useBom: true
    };

    // tslint:disable-next-line:no-unused-expression
    new Angular2Csv(this.flavors, 'Reporte de sabores más vendidos', options);
  }

}
