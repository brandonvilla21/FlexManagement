import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../services/customer/customer.service';
import { Customer } from '../../customer.model';

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
}