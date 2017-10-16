import { Employee } from './../../../employee/employee.model';
import { Customer } from './../../../customer/customer.model';
import { SearchModalComponent } from './../../../shared/search-modal/search-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from './../../../processes/payment/services/payment.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from './../../services/reports.service';
import { Ng2PdfService } from './../../../shared/ng2-pdf/ng2-pdf.service';

@Component({
  selector: 'app-sale-history-report',
  templateUrl: './sale-history-report.component.html',
  styleUrls: ['./sale-history-report.component.scss']
})
export class SaleHistoryReportComponent implements OnInit {
  public salesEmployee: any[];
  public salesCustomer: any[];
  public columnOption: String;
  public fromDate: Date;
  public toDate: Date;
  public id_search: String;

  public customer: Customer;
  public employee: Employee;

  constructor( private reportsService: ReportsService, private ng2PdfService: Ng2PdfService,
               private dialogService: DialogService, private router: Router, 
               private activatedRoute: ActivatedRoute
  ) { 

  }

  ngOnInit() { 
    this.loadOption();
    this.setValues();
  }

  

  loadOption(){
    this.activatedRoute.params.subscribe( params => this.columnOption = params['id'] )
  }

  setValues(){
    this.customer = { customer_id: '', name: '', lastname: '', reference: '', whatsapp: '', facebook: '', balance: 0 };
    this.employee = { employee_id: '', name: '', lastname: '', address: '', whatsapp: '' };
    this.salesEmployee = [];
    this.salesCustomer = [];
  }

  showModalSearch( type: string, title: string) {
    this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title
    }).subscribe( data => {
      if ( data ) {
        switch ( type ) {
          case 'customer': this.customer = data; this.id_search = this.customer.customer_id; break;
          case 'employee': this.employee = data; this.id_search = this.employee.employee_id; break;
        }

        this.loadSalesTables();

      }
    })
  }

  loadSalesTables() {
    if(this.isValidForm()) {
      this.reportsService.salesHistoryByColumnInAPeriod({ 
        fromDate: this.fromDate, toDate: this.toDate, column: this.columnOption,  id: this.id_search
      })
      .subscribe( sales => {
        switch(this.columnOption){
          case 'customer_id': this.salesCustomer = sales; console.log('this.salesCustomer: ', this.salesCustomer); break;
          case 'employee_id': this.salesEmployee = sales; console.log('this.salesEmployee: ', this.salesEmployee); break;
        }
      });
    } else {
      console.log("No entró al if.")
    }
    
  }

  download() {
    if (this.isValidForm())
      switch (this.columnOption) {
        case 'customer_id': this.generateCustomerPDF(); break;
        case 'employee_id': this.generateEmployeePDF(); break;
      }
  }

  generateCustomerPDF(){
    const columns = [ 'ID', 'EMPLEADO', 'FECHA', 'ESTADO', 'TIPO', 'SUBTOTAL', 'DESCUENTO', 'TOTAL ABONOS', 'TOTAL'];
    const rows = [];
    console.log('HHHHHHH: ', this.salesCustomer);
    this.salesCustomer.forEach( sale => {

      rows.push([
        sale.sale_id || '',
        sale.employee_name && sale.employee_lastname ? `${sale.employee_name} ${sale.employee_lastname}` : '',
        sale.sale_date ? new Date(sale.sale_date).toLocaleDateString() : '',
        sale.state || '',
        sale.type || '',
        sale.subtotal ,
        sale.discount,
        sale.total_payment,
        sale.total,
      ])
    })

    const fromDate = `DESDE: ${this.fromDate}`;
    const toDate = `HASTA: ${this.toDate}`;
    const customerName = `CLIENTE: ${this.customer.name} ${this.customer.lastname}`

    this.ng2PdfService.pdfTableWithDates(
      columns, rows, 'HISTORIAL DE VENTAS A UN CLIENTE EN UN PERÍODO', fromDate, toDate, customerName, 'Historial de Ventas por cliente.pdf');
  }


  generateEmployeePDF() {
    const columns = [ 'ID', 'CLIENTE', 'FECHA', 'ESTADO', 'TIPO', 'SUBTOTAL', 'DESCUENTO', 'TOTAL ABONOS', 'TOTAL'];
    const rows = [];
    let subtotal = 0;
    let discount = 0;
    let totalPayment = 0;
    let total = 0;
    this.salesEmployee.forEach( sale => {
    
      rows.push([
        sale.sale_id || '',
        sale.customer_name && sale.customer_lastname ? `${sale.customer_name} ${sale.customer_lastname}` : '',
        sale.sale_date ? new Date(sale.sale_date).toLocaleDateString() : '',
        sale.state || '',
        sale.type || '',
        sale.subtotal,
        sale.discount,
        sale.total_payment,
        sale.total,
      ])
      subtotal += sale.subtotal;
      discount += sale.discount;
      totalPayment += sale.total_payment;
      total += sale.total;
    })
    rows.push(['', '', '', '', '', '', '', '', '']);
    rows.push(['', '', '', '', 'TOTAL', subtotal, discount, totalPayment, total]);

    const fromDate = `DESDE: ${this.fromDate}`;
    const toDate = `HASTA: ${this.toDate}`;
    const employeeName = `EMPLEADO: ${this.employee.name} ${this.employee.lastname}`

    this.ng2PdfService.pdfTableWithDates(
      columns, rows, 'HISTORIAL DE VENTAS A UN EMPLEADO EN UN PERÍODO', fromDate, toDate, employeeName, 'Historial de Ventas por empleado.pdf');
  }

  isValidForm() {
    return this.fromDate && this.toDate && this.id_search;
  }

}
