import { HelpModule } from './help/help.module';
import { AuthService } from './session/services/auth.service';
import { SessionModule } from './session/session.module';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ToolTipModule } from 'angular2-tooltip'

// Imported modules
import { ProductModule } from './product/product.module';
import { ProviderModule } from './provider/provider.module';
import { ProcessesModule } from './processes/processes.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';


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
import { SearchModalComponent } from './shared/search-modal/search-modal.component';


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
    CustomerModule,
    EmployeeModule,
    SessionModule,
    HelpModule,
    BootstrapModalModule.forRoot({ container: document.body }),
    ToolTipModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    SearchModalComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    ConfigUrlService,
    AuthService
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ SearchModalComponent ],
})
export class AppModule { }
