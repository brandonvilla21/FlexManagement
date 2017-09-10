import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Customer } from './../../customer.model';
import { CustomerService } from './../../services/customer/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-show',
  templateUrl: './customer-show.component.html',
  styleUrls: ['./customer-show.component.scss']
})
export class CustomerShowComponent implements OnInit {

  public customerId: string;
  public customer: Customer;

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService) {
    this.activatedRoute.params.subscribe( parameters => {
      this.customerId = parameters['id'];
      this.customerService.findById( this.customerId )
          .subscribe( customer => {
              this.customer = customer[0];
          });
  });
  }

  ngOnInit() {
  }

}
