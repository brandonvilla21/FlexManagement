import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from './../../../../product/services/product.service';
import { Product } from './../../../../product/product.model';
import { EmployeeService } from './../../../../employee/services/employee/employee.service';
import { SaleProductInterface } from './../../../sale/models/sale-product.model';
import { Employee } from './../../../../employee/employee.model';
import { SearchModalComponent } from './../../../../shared/search-modal/search-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';
import { DevolutionInterface } from './../../models/devolution.model';
import { DevolutionService } from './../../services/devolution.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-devolution-create',
  templateUrl: './devolution-create.component.html',
  styleUrls: ['./devolution-create.component.scss']
})
export class DevolutionCreateComponent implements OnInit {
  public devolution: DevolutionInterface = {
    devolution_id: '',
    sale_id: '',
    employee_id: '',
    devolution_date: new Date(),
    total_returned: 0,
    concept: '',
  };
  public employeeForm: Employee = {
    employee_id: '',
    name: '',
    lastname: '',
    address: '',
    whatsapp: '',
  };
  public saleProductForm: SaleProductInterface = {
    sale_id: '',
    customer_id: '',
    employee_id: '',
    sale_date: new Date('01-01-0000'),
    type: '',
    state: '',
    subtotal: 0,
    discount: 0,
    total: 0,
    total_payment: 0,
    product_saleProduct: []
  };
  productsTable: any[] = [];
  public employeeName = '';
  public employeeContact = '';

  public currentDate: any;

  constructor(
    private devolutionService: DevolutionService,
    private dialogService: DialogService,
    private employeeService: EmployeeService,
    private productService: ProductService,
    private router: Router
  ) {
    this.getDevolutionCount();
  }

  ngOnInit() {
    this.getDate();
  }

  getDevolutionCount() {
    this.devolutionService.count()
      .subscribe( res => this.devolution.devolution_id = res[0].number_of_devolutions + 1 );
  }

  getDate() {
    this.currentDate = Observable.interval(1000).map(x => new Date()).share();
  }

  onSubmitDevolution( form: NgForm) {
    if ( form.valid ) {
      this.devolutionService.create( this.devolution )
        .subscribe( res => {
          this.router.navigate(['/processes/devolution/all']);
        });
    }
  }
  showModalSearch(type: string, title: string) {
    const disposable = this.dialogService.addDialog(SearchModalComponent, {
      type: type,
      title: title,
    }).subscribe( data => {
      if (data) {
        switch (type) {
          case 'employee':
            this.employeeForm = data;
            this.devolution.employee_id = this.employeeForm.employee_id;
            break;
          case 'sale_product_for_devolution':
            this.saleProductForm = data;
            this.devolution.sale_id = this.saleProductForm.sale_id;
            this.devolution.total_returned = this.saleProductForm.total;
            // To fill Employee's data
            this.employeeService.findById( this.saleProductForm.employee_id )
              .subscribe( employee => {
                this.employeeName = `${employee[0].name} ${employee[0].lastname}`;
                this.employeeContact = employee[0].whatsapp;
              });
            // To fill Table in template
            this.saleProductForm.product_saleProduct.forEach( productForm => {
              this.productService.findById( productForm.product_id )
                .subscribe( product => {
                  this.productsTable.push({
                    product_id: productForm.product_id,
                    description: product[0].description,
                    sale_price: productForm.price,
                    saleExistence: productForm.amount,
                  })
                })
            });
            break;
        }
      }
    });
  }

}
