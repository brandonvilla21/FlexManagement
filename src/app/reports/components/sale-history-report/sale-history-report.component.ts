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
  public columnOption;
  public saleType: String = 'CRÉDITO/CONTADO'
  public fromDate: Date;
  public toDate: Date;
  public id_search: String;
  public chartOnPDF: String = 'no';

  public customer: Customer;
  public employee: Employee;

  
  public chartOptions = {
    responsive: true
  }

  public charts: any = {
    all: {
      doughnutChartLabels: [],
      doughnutChartData: [],
      loaded: false,
      option: 'all'
    },

    employee: {
      doughnutChartLabels: [],
      doughnutChartData: [],
      loaded: false,
      option: 'employee_id'
    },
    
    customer: {
      doughnutChartLabels: [],
      doughnutChartData: [],
      loaded: false,
      option: 'customer_id'
      
    }

  }
  
  public chartType:string = 'doughnut';
  

  constructor( private reportsService: ReportsService, private ng2PdfService: Ng2PdfService,
               private dialogService: DialogService, private router: Router
  ) {
      this.columnOption = 'all';

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

  resetHiddenCharts(){

    for (let key in this.charts) {
      this.charts[key].loaded = false;
    }

    setTimeout( () => {
      for (let key in this.charts) {
        this.charts[key].loaded = (this.charts[key].option == this.columnOption);
      }
    }, 100);

  }

  saleArrayIsEmpty() {
    switch (this.columnOption) {
      case 'all':
        return this.salesAll.length == 0;

      case 'customer_id':
        return this.salesCustomer.length == 0;

      case 'employee_id':
        return this.salesCustomer.length == 0;
    
      
    }
  }

  generateGraphic() {
    switch (this.columnOption) {
      case 'all':
        this.charts.all.doughnutChartLabels.length = 0;
        this.charts.all.doughnutChartData.length = 0;
        
        this.salesAll.forEach( sale => {
          this.charts.all.doughnutChartLabels.push(`ID Venta: ${sale.sale_id}`);
          this.charts.all.doughnutChartData.push(sale.total);
        });
        
        this.resetHiddenCharts();
      break;

      case 'customer_id':
        this.charts.customer.doughnutChartLabels.length = 0;
        this.charts.customer.doughnutChartData.length = 0;
        
        this.salesCustomer.forEach( sale => {
          this.charts.customer.doughnutChartLabels.push(`ID Venta ${sale.sale_id}`);
          this.charts.customer.doughnutChartData.push(sale.total);
        });
        
        this.resetHiddenCharts();
      break;

      case 'employee_id':
        this.charts.employee.doughnutChartLabels.length = 0;
        this.charts.employee.doughnutChartData.length = 0;
        this.salesEmployee.forEach( sale => {
          this.charts.employee.doughnutChartLabels.push(`ID Venta ${sale.sale_id}`);
          this.charts.employee.doughnutChartData.push(sale.total);
        });
        
        this.resetHiddenCharts();
      break;
    }



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
        switch( this.columnOption ) {
          case 'customer_id': this.salesCustomer = sales; this.generateGraphic(); break;
          case 'employee_id': this.salesEmployee = sales; this.generateGraphic(); break;
          case 'all':         this.salesAll      = sales; this.generateGraphic(); break;
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
        case 'all':         this.generateGeneralSalesPDF(); break;
      }
  }

  onChartClick(event) {
    console.log(event);
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

    const canvas = document.querySelector("canvas");
    this.setDPI(canvas, 240);

    this.ng2PdfService.pdfTableWithDates(
      columns, rows, 'HISTORIAL DE VENTAS A UN CLIENTE EN UN PERÍODO', fromDate, toDate, customerName, saleType, 'Historial de Ventas por cliente.pdf',
    false, this.chartOnPDF == 'yes' ? canvas : null);
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

    const canvas = document.querySelector("canvas");
    this.setDPI(canvas, 240);

    this.ng2PdfService.pdfTableWithDates(
      columns, rows, 'HISTORIAL DE VENTAS A UN EMPLEADO EN UN PERÍODO', fromDate, toDate, employeeName, saleType, 'Historial de Ventas por empleado.pdf',
    false, this.chartOnPDF == 'yes' ? canvas : null);
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
    
    const canvas = document.querySelector("canvas");
    this.setDPI(canvas, 240);

    this.ng2PdfService.pdfTableWithDates(
      columns, rows, 'HISTORIAL DE VENTAS GENERALES UN PERÍODO', fromDate, toDate, allSales, saleType, 'Historial de Ventas generales.pdf',
    false, this.chartOnPDF == 'yes' ? canvas : null);
  
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

  //Method to increase the canvas' DPI and therefore, its render quality.
  setDPI(canvas, dpi) {
    // Set up CSS size.
    canvas.style.width = canvas.style.width || canvas.width + 'px';
    canvas.style.height = canvas.style.height || canvas.height + 'px';

    // Get size information.
    var scaleFactor = dpi / 96;
    var width = parseFloat(canvas.style.width);
    var height = parseFloat(canvas.style.height);

    // Backup the canvas contents.
    var oldScale = canvas.width / width;
    var backupScale = scaleFactor / oldScale;
    var backup = canvas.cloneNode(false);
    backup.getContext('2d').drawImage(canvas, 0, 0);

    // Resize the canvas.
    var ctx = canvas.getContext('2d');
    canvas.width = Math.ceil(width * scaleFactor);
    canvas.height = Math.ceil(height * scaleFactor);

    // Redraw the canvas image and scale future draws.
    ctx.setTransform(backupScale, 0, 0, backupScale, 0, 0);
    ctx.drawImage(backup, 0, 0);
    ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
}

}
