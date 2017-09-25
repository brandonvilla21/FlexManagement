import { ProductService } from './../../../../product/services/product.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../../../../employee/services/employee/employee.service';
import { DevolutionService } from './../../services/devolution.service';
import { SaleProductInterface } from './../../../sale/models/sale-product.model';
import { SaleProductService } from './../../../sale/services/sale-product.service';
import { Employee } from './../../../../employee/employee.model';
import { DevolutionInterface } from './../../models/devolution.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devolution-show',
  templateUrl: './devolution-show.component.html',
  styleUrls: ['./devolution-show.component.scss'],
  providers: [
    SaleProductService
  ]
})
export class DevolutionShowComponent implements OnInit {
  public devolution: DevolutionInterface = {
    devolution_id: '',
    sale_id: '',
    employee_id: '',
    devolution_date: new Date(),
    total_returned: 0,
    concept: ''
  }
  public employeeDevolution: Employee = {
    employee_id: '',
    name: '',
    lastname: '',
    address: '',
    whatsapp: ''
  }
  public employeeSaleProduct: Employee = {
    employee_id: '',
    name: '',
    lastname: '',
    address: '',
    whatsapp: ''
  }

  public saleProduct: SaleProductInterface = {
    sale_id: '',
    customer_id: '',
    employee_id: '',
    sale_date: new Date(),
    type: '',
    state: '',
    subtotal: 0,
    discount: 0,
    total: 0,
    total_payment: 0,
    product_saleProduct: []
  }
  public table = [];

  constructor(
    private devolutionService: DevolutionService,
    private employeeService: EmployeeService,
    private saleProductService: SaleProductService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {

    this.activatedRoute.params.subscribe( params => {
      this.devolution.devolution_id = params['id'];
    })
  }

  ngOnInit() {

    this.devolutionService.findById( this.devolution.devolution_id )
      .flatMap(  devolution => {
        this.devolution = devolution[0]
        return this.employeeService.findById( this.devolution.employee_id )
      })
      .flatMap( employeeDevolution => {
        this.employeeDevolution = employeeDevolution[0]
        return this.saleProductService.findById( this.devolution.sale_id )
      })
      .flatMap( saleProduct => {
        this.saleProduct = saleProduct;
        this.fillTable()
        return this.employeeService.findById( this.saleProduct.employee_id )
      })
      .subscribe( employeeSaleProduct => {
        this.employeeSaleProduct = employeeSaleProduct[0]
      },
      error => console.log(error),
      () => {
        console.log('Success!')
      })
  }
   fillTable() {
    this.saleProduct.product_saleProduct.forEach( productForm => {
      this.productService.findById( productForm.product_id )
        .subscribe( product => {
          this.table.push({
            product_id: productForm.product_id,
            description: product[0].description,
            sale_price: productForm.price,
            saleExistence: productForm.amount,
          })
        })
    });
   }
}
