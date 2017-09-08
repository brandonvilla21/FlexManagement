import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../../services/customer/customer.service';
import { Customer } from './../../../interfaces/customer';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  public customer: Customer;

  constructor( private customerService: CustomerService ) {

    this.customer = { customer_id: null, name: '', lastname: '', reference: '', whatsapp: '', facebook: '', balance: 0.00 };
    
  }

  ngOnInit() {
  }

  onSubmitCustomer(value: NgForm) {
    if (value.valid) {
      this.customerService.create( this.customer )
        .subscribe( res => {
          console.log(res);
        })
    }
  }

}
