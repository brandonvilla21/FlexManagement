import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Customer } from './../../customer.model';
import { CustomerService } from './../../services/customer/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  public customerId: string;
  public customer: Customer;

  constructor(private activatedRoute: ActivatedRoute, 
              private customerService: CustomerService,
              private router: Router) {

    this.activatedRoute.params.subscribe( parameters => {
        this.customerId = parameters['id'];
        this.customerService.findById( this.customerId )
            .subscribe( customer => {
                this.customer = customer[0];
            });
    });

  }

  onSubmitCustomerEdit(value: NgForm) {
    if (value.valid) {
      this.customerService.update( this.customer )
        .subscribe( res => {
          console.log(res);
          this.router.navigate(['/customers/all']);
        })
    }
  }


  ngOnInit() {
  }

}
