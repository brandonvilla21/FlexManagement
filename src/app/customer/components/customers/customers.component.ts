import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../services/customer/customer.service';
import { Customer } from '../../customer.model';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customers: Customer[];
  public customer_id: number;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.all()
      .subscribe(data => {
        this.customers = data;
      });
  }

  deleteCustomer(customer) {
    this.customerService.delete(customer)
      .subscribe(res => {
        this.getCustomers();
      });
  }

  downloadCSV() {

    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      headers: Object.keys(this.customers[0]),
      useBom: true
    };
   
     
    new Angular2Csv(this.customers, 'Catálogo de clientes', options);
  }



}