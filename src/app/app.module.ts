import { ProductEditComponent } from './components/product/product-edit.component';
import { ProductShowComponent } from './components/product/product-show.component';
import { ProductCreateComponent } from './components/product/product-create.component';
import { ProductService } from './shared/product.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

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
import { CustomerComponent } from './components/customer/customer.component';
import { ProductComponent } from './components/product/product.component';
import { CreateComponent } from './components/employee/create/create.component';
import { EditComponent } from './components/employee/edit/edit.component';
import { EmployeeComponent } from './components/employee/employee/employee.component';
import { EmployeesComponent } from './components/employee/employees/employees.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    CustomerComponent,
    ProductComponent,
    ProductCreateComponent,
    ProductShowComponent,
    ProductEditComponent,
    CreateComponent,
    EditComponent,
    EmployeeComponent,
    EmployeesComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    ProductService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
