import { Provider } from './../../provider/provider.model';
import { Employee } from './../../employee/employee.model';
import { Product } from './../../product/product.model';

import { ProductService } from './../../product/services/product.service';
import { ProviderService } from './../../provider/services/provider/provider.service';
import { EmployeeService } from './../../employee/services/employee/employee.service';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface SearchModalInterface {
  type: string,
  title: string
}

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent extends DialogComponent<SearchModalInterface, any> implements OnInit, SearchModalInterface {
  public providers: Provider[];
  public employees: Employee[];
  public products: Product[];

  type: string;
  title: string;

  constructor(
    dialogService: DialogService,
    private providersService: ProviderService,
    private employeeService: EmployeeService,
    private productService: ProductService
  ) {
    super(dialogService);
   }

  ngOnInit() {

    switch (this.type) {
      case 'provider':
        this.getProviders();
        break;
      case 'employee':
        this.getEmployees();
        break; // it encounters this break so will not continue into 'case 2:'
      case 'product':
        this.getProducts();

        break;
    }
  }

  confirm(object: any) {
    this.result = object;
    this.close();
  }

  getProviders() {
    this.providersService.all()
      .subscribe( providers => this.providers = providers);
  }

  getEmployees() {
    this.employeeService.all()
      .subscribe( employees => this.employees = employees);
  }

  getProducts() {
    this.productService.all()
      .subscribe( products => this.products = products);
  }

}
