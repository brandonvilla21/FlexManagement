import { Component, OnInit } from '@angular/core';
import { Employee } from './../../../interfaces/employee';
import { EmployeeService } from './../../../services/employee/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.all()
      .subscribe( data => {
        this.employees = data;
      });
  }

}
