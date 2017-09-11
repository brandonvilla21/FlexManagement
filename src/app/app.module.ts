import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Imported modules
import { ProviderModule } from './provider/provider.module';
import { ProductModule } from './product/product.module';
import { ProcessesModule } from './processes/processes.module';

// Services.
import { CustomerService } from './services/customer/customer.service';
import { EmployeeService } from './services/employee/employee.service';

// Url service configuration.
import { ConfigUrlService } from './services/config-url/config.url.service';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';

// Customer Components
import { CustomerComponent } from './components/customer/customers/customer.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerShowComponent } from './components/customer/customer-show/customer-show.component';



// Provider components
import { EmployeesComponent } from './components/employee/employees/employees.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    FormsModule,
    ProviderModule,
    ProductModule,
    ProcessesModule,
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    CustomerComponent,
    CustomerCreateComponent,
    EmployeesComponent,
    CustomerCreateComponent,
    EmployeeCreateComponent,
    CustomerEditComponent,
    CustomerShowComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    ConfigUrlService,
    CustomerService,
    EmployeeService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
