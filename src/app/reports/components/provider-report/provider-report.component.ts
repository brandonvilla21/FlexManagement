import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';
import { ReportsService } from './../../services/reports.service';
import { Provider } from './../../../provider/provider.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-report',
  templateUrl: './provider-report.component.html',
  styleUrls: ['./provider-report.component.scss']
})
export class ProviderReportComponent implements OnInit {
  public providers: Provider[];
  constructor(
    private ng2PdfService: Ng2PdfService,
    private reportsService: ReportsService
  ) { 
    this.providers = [];
  }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.reportsService.getTabeData( 'provider ')
      .subscribe( res => this.providers = res );
  }

  download() {

    const columns = [ 'ID', 'NOMBRE', 'DESCRIPCIÓN', 'CONTACTO', 'EMAIL', 'TELÉFONO'];
    const rows = [];
    this.providers.forEach( provider => {
      rows.push([
        provider.provider_id,
        provider.name || '',
        provider.description || '',
        provider.contact || '',
        provider.email || '',
        provider.phone || '',
      ])
    })

    // Set the date to PDF
    const date = 'Fecha: ' + new Date().toLocaleDateString();

    this.ng2PdfService.pdfTableDate( columns, rows, 'LISTA DE PROVEEDORES', 'Proveedores.pdf', date );
  }


}
