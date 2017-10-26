import { Employee } from './../../../employee/employee.model';
import { Customer } from './../../../customer/customer.model';
import { SearchModalComponent } from './../../../shared/search-modal/search-modal.component';
import { Router } from '@angular/router';
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
  public salesAll: any[];
  public columnOption: String = 'all';
  public saleType: String = 'CRÉDITO/CONTADO'
  public fromDate: Date;
  public toDate: Date;
  public id_search: String;

  public customer: Customer;
  public employee: Employee;

  

  public graphics = {
    all: {
      doughnutChartLabels: [],
      doughnutChartData: [],
      loaded: false
    },

    employee: {
      doughnutChartLabels: [],
      doughnutChartData: [],
      loaded: false
    },
    
    customer: {
      doughnutChartLabels: [],
      doughnutChartData: [],
      loaded: false
    }

  }
  
  public doughnutChartType:string = 'doughnut';
  

  constructor( private reportsService: ReportsService, private ng2PdfService: Ng2PdfService,
               private dialogService: DialogService, private router: Router
  ) { 

  }

  ngOnInit() {
    this.setValues();
    
  }

  setValues(){
    this.customer = { customer_id: '', name: '', lastname: '', reference: '', whatsapp: '', facebook: '', balance: 0 };
    this.employee = { employee_id: '', name: '', lastname: '', address: '', whatsapp: '' };
    this.salesEmployee = [];
    this.salesCustomer = [];
    this.salesAll = [];
    this.id_search = '';
    this.loadSalesTables();
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

      if(this.columnOption == 'all')
        this.id_search = '0';

      this.reportsService.salesHistoryByColumnInAPeriod({ 
        fromDate: this.fromDate, toDate: this.toDate, column: this.columnOption,  id: this.id_search, saleType: this.saleType
      })
      .subscribe( sales => {
        switch( this.columnOption ){
          case 'customer_id': this.salesCustomer = sales; this.generateGraphic(this.columnOption); console.log('this.salesCustomer: ', this.salesCustomer); break;
          case 'employee_id': this.salesEmployee = sales; this.generateGraphic(this.columnOption); console.log('this.salesEmployee: ', this.salesEmployee); break;
          case 'all':         this.salesAll      = sales; this.generateGraphic(this.columnOption); console.log('this.salesAll: ', this.salesAll);           break;
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
        case 'all':     this.generateGeneralSalesPDF(); break;
      }
  }


  

  onChartClick(event) {
    console.log(event);
  }




  generateGraphic(type: String) {
    switch (type) {
      case 'all':
      this.salesAll.forEach( sale => {
        this.graphics.all.doughnutChartLabels.push(`Venta ${sale.sale_id}`);
        this.graphics.all.doughnutChartData.push(sale.total);
      });
      
      console.log('this.doughnutChartLabels: ', this.graphics.all.doughnutChartLabels);
      console.log('this.doughnutChartData: ', this.graphics.all.doughnutChartData);

      this.graphics.all.loaded = true;



        // { data: [330, 600, 260, 700], label: 'Account A' },
        // { data: [120, 455, 100, 340], label: 'Account B' },
        // { data: [45, 67, 800, 500], label: 'Account C' }

      break;
    }
  }  

  generateCustomerPDF(){
    let columns = [ 'ID', 'EMPLEADO', 'FECHA', 'ESTADO', 'TIPO', 'SUBTOTAL', 'DESCUENTO', 'TOTAL'];
    let rows = [];
    let subtotal = 0;
    let discount = 0;
    let total = 0;

    this.salesCustomer.forEach( sale => {

      rows.push([
        sale.sale_id || '',
        sale.employee_name && sale.employee_lastname ? `${sale.employee_name} ${sale.employee_lastname}` : '',
        sale.sale_date ? new Date(sale.sale_date).toLocaleDateString() : '',
        sale.state || '',
        sale.type || '',
        sale.subtotal ,
        sale.discount,
        sale.total,
      ])
      subtotal += sale.subtotal;
      discount += sale.discount;
      total += sale.total;
    })

    rows.push(['', '', '', '', '', '', '', '', '']);
    rows.push(['', '', '', '', 'TOTAL', subtotal, discount, total]);

    rows = this.removeTypeRows(rows);
    columns = this.removeTypeColumns(columns);

    const fromDate = `DESDE: ${this.fromDate}`;
    const toDate = `HASTA: ${this.toDate}`;
    const customerName = `CLIENTE: ${this.customer.name} ${this.customer.lastname}`
    const saleType = `TIPO: ${this.saleType}`

    this.ng2PdfService.pdfTableWithDates(
      columns, rows, 'HISTORIAL DE VENTAS A UN CLIENTE EN UN PERÍODO', fromDate, toDate, customerName, saleType, 'Historial de Ventas por cliente.pdf');
  }


  generateEmployeePDF() {
    let columns = [ 'ID', 'CLIENTE', 'FECHA', 'ESTADO', 'TIPO', 'SUBTOTAL', 'DESCUENTO', 'TOTAL'];
    let rows = [];
    let subtotal = 0;
    let discount = 0;
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
        sale.total,
      ])
      subtotal += sale.subtotal;
      discount += sale.discount;
      total += sale.total;
    })

    rows.push(['', '', '', '', '', '', '', '', '']);
    rows.push(['', '', '', '', 'TOTAL', subtotal, discount, total]);

    rows = this.removeTypeRows(rows);
    columns = this.removeTypeColumns(columns);

    const fromDate = `DESDE: ${this.fromDate}`;
    const toDate = `HASTA: ${this.toDate}`;
    const employeeName = `EMPLEADO: ${this.employee.name} ${this.employee.lastname}`
    const saleType = `TIPO: ${this.saleType}`    

    this.ng2PdfService.pdfTableWithDates(
      columns, rows, 'HISTORIAL DE VENTAS A UN EMPLEADO EN UN PERÍODO', fromDate, toDate, employeeName, saleType, 'Historial de Ventas por empleado.pdf');
  }
  

  generateGeneralSalesPDF() {
    let columns = [ 'ID', 'EMPLEADO', 'CLIENTE', 'FECHA', 'ESTADO', 'TIPO', 'SUBTOTAL', 'DESCUENTO', 'TOTAL'];
    let rows = [];
    let subtotal = 0;
    let discount = 0;
    let total = 0;
    this.salesAll.forEach( sale => {
    
      rows.push([
        sale.sale_id || '',
        sale.employee_name && sale.employee_lastname ? `${sale.employee_name} ${sale.employee_lastname}` : '',
        sale.customer_name && sale.customer_lastname ? `${sale.customer_name} ${sale.customer_lastname}` : '',
        sale.sale_date ? new Date(sale.sale_date).toLocaleDateString() : '',
        sale.state || '',
        sale.type || '',
        sale.subtotal,
        sale.discount,
        sale.total,
      ])
      subtotal += sale.subtotal;
      discount += sale.discount;
      total += sale.total;
    })

    rows.push(['', '', '', '', '', '', '', '', '']);
    rows.push(['', '', '', '', '', 'TOTAL', subtotal, discount, total]);

    rows = this.removeTypeRows(rows);
    columns = this.removeTypeColumns(columns);

    const fromDate = `DESDE: ${this.fromDate}`;
    const toDate = `HASTA: ${this.toDate}`;
    const allSales = `VENTAS GENERALES`
    const saleType = `TIPO: ${this.saleType}`
    
    this.ng2PdfService.pdfTableWithDates(
      columns, rows, 'HISTORIAL DE VENTAS GENERALES UN PERÍODO', fromDate, toDate, allSales, saleType, 'Historial de Ventas generales.pdf');
  
  }

  removeTypeRows(rows: any[][]){
    if(this.saleType != 'CRÉDITO/CONTADO') {

      //TO REMOVE `CRÉDITO` OR `CONTADO` VALUES FROM THE rows.
      for (let i = 0; i < rows.length; i++) {
        if(i < rows.length - 2)
          rows[i] = rows[i].filter( cell => cell != 'CRÉDITO' && cell != 'CONTADO');
        else 
          rows[i].shift();
      }
    }

    return rows;
  }

  removeTypeColumns(columns: any[]){
    if(this.saleType != 'CRÉDITO/CONTADO') {

      //TO REMOVE `TIPO` VALUES FORM THE columns.
      columns = columns.filter( column => column != 'TIPO' );
    }

    return columns;
  }

  isValidForm() {
    return (this.fromDate && this.toDate) && (this.id_search || this.columnOption == 'all');
  }



}
