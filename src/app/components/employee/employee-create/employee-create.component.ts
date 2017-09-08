import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../../../services/employee/employee.service';
import { Employee } from './../../../interfaces/employee';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {

  public employee: Employee;

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.employee = { employee_id: null, name: '', lastname: '', address: '', whatsapp: '' };
  }

  onSubmitEmployee(value: NgForm) {
    if (value.valid) {
      this.employeeService.create( this.employee )
        .subscribe( res => {
          console.log(res);
        })
    }
  }

}
