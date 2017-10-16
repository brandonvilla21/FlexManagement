import { Component, OnInit } from '@angular/core';
import { ReportsService } from './../services/reports.service';
import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';

@Component({
  selector: 'app-sale-history-report',
  templateUrl: './sale-history-report.component.html',
  styleUrls: ['./sale-history-report.component.scss']
})
export class SaleHistoryReportComponent implements OnInit {
  public sales: any[];
  constructor( private reportsService: ReportsService, private ng2PdfService: Ng2PdfService ) { 
    this.sales = [];
  }

  ngOnInit() {
    this.getSales();
  }
  
  getSales() {
    this.reportsService.salesHistoryByColumnInAPeriod({
      fromDate: '2010-10-10',
      toDate: '2017-11-11',
      column: 'employee_id',
      id: 1
    }).subscribe( sales => console.log("sales: ", sales) );
  }

}
