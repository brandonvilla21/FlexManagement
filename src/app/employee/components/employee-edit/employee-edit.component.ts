import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Employee } from './../../employee.model';
import { EmployeeService } from './../../services/employee/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  public employeeId: string;
  public employee: Employee;

  constructor(private activatedRoute: ActivatedRoute, 
              private employeeService: EmployeeService,
              private router: Router) {
      this.activatedRoute.params.subscribe( parameters => {
        this.employeeId = parameters['id'];
        this.employeeService.findById( this.employeeId )
            .subscribe( employee => {
              console.log(employee);
                this.employee = employee;
            });
    });
                
  }

  ngOnInit() {
  }

  onSubmitEmployeeEdit(value: NgForm) {
    if (value.valid) {
      this.employeeService.update( this.employee )
      .subscribe( res => {
        console.log('this.employee: ', this.employee);
          console.log(res);
          this.router.navigate(['/employees/all']);
        })
    }
  }

}
