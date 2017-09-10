import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../services/customer/customer.service';
import { Customer } from '../../customer.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  public customer: Customer;

  constructor( private customerService: CustomerService, private router: Router) {

    this.customer = { customer_id: null, name: '', lastname: '', reference: '', whatsapp: '', facebook: '', balance: 0.00 };
    
  }

  ngOnInit() {
  }

  onSubmitCustomer(value: NgForm) {
    if (value.valid) {
      this.customerService.create( this.customer )
        .subscribe( res => {
          console.log(res);
          this.router.navigate(['/customers/all']);          
        })
    }
  }

}
