import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../employee.model';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

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

  downloadCSV() {
    
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      headers: Object.keys(this.employees[0]),
      useBom: true
    };
   
     
    new Angular2Csv(this.employees, 'Catálogo de empleados', options);
  }

}
