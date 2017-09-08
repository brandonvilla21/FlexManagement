import { Component, OnInit } from '@angular/core';
import { Customer } from './../../interfaces/customer';
import { CustomerService } from './../../services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customers: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.all()
      .subscribe( data => {
        this.customers = data;
      });
  }

}
