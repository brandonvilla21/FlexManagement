import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public employees: Employee[];
  public employee_id: number;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.all()
      .subscribe( data => {
        console.log('data: ', data);
        this.employees = data;
      });
  }

  deleteEmployee(employee) {
    this.employeeService.delete(employee)
      .subscribe(res => {
        this.getEmployees();
      });
  }
  // For Debounce
  // https://stackoverflow.com/questions/42761163/angular-2-debouncing-a-keyup-event
  onKeyUp( searchTextValue ) {
    console.log(searchTextValue);
  }

}
