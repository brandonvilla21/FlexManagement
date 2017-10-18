import { Employee } from './../../../employee/employee.model';
import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';
import { ReportsService } from './../../services/reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.scss']
})
export class EmployeeReportComponent implements OnInit {
  public employees: Employee[];
  constructor(
    private ng2PdfService: Ng2PdfService,
    private reportsService: ReportsService
  ) {
    this.employees = [];
  }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.reportsService.getTabeData( 'employee ')
      .subscribe( res => this.employees = res );
  }

  download() {

    const columns = [ 'ID', 'NOMBRE', 'APELLIDO(S)', 'DIRECCIÓN', 'WHATSAPP'];
    const rows = [];
    this.employees.forEach( employee => {
      rows.push([
        employee.employee_id,
        employee.name || '',
        employee.lastname || '',
        employee.address || '',
        employee.whatsapp || '',
      ])
    })

    // Set the date to PDF
    const date = 'Fecha: ' + new Date().toLocaleDateString();

    this.ng2PdfService.pdfTableDate( columns, rows, 'LISTA DE EMPLEADOS', 'Empleados.pdf', date );
  }
}
