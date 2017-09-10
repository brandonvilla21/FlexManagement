import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomerComponent } from './customer.component';
import { CustomerService } from './services/customer/customer.service';
import { CustomerRoutingModule } from './customer.routing';

import { CustomersComponent } from './components/customers/customers.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerShowComponent } from './components/customer-show/customer-show.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomerRoutingModule,
    ],
    exports: [],
    declarations: [
        CustomerComponent,
        CustomersComponent,
        CustomerCreateComponent,
        CustomerEditComponent,
        CustomerShowComponent
    ],
    providers: [
        CustomerService
    ],
})
export class CustomerModule { }
