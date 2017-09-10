import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Customer } from './../../customer.model';
import { CustomerService } from './../../services/customer/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  public customerId: string;
  public customer: Customer;

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService) {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe( parameters => {
        this.customerId = parameters['id'];
        this.customerService.findById( this.customerId )
            .subscribe( customer => {
                console.log(customer);
                this.customer = customer;
            });
    });
  }

  onSubmitCustomerEdit(value: NgForm) {
    console.log(value);
    if (value.valid && !true) {
      this.customerService.create( this.customer )
        .subscribe( res => {
          console.log(res);
        })
    }
  }


  ngOnInit() {
  }

}
