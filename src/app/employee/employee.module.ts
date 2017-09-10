import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeComponent } from './employee.component';
import { EmployeeService } from './services/employee/employee.service';
import { EmployeeRoutingModule } from './employee.routing';

import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
// import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
// import { EmployeeShowComponent } from './components/employee-show/employee-show.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EmployeeRoutingModule,
    ],
    exports: [],
    declarations: [
        EmployeeComponent,
        EmployeesComponent,
        // EmployeeEditComponent,
        // EmployeeShowComponent,
        EmployeeCreateComponent
    ],
    providers: [
        EmployeeService
    ],
})
export class EmployeeModule { }
