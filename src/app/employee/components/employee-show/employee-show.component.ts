import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Employee } from './../../employee.model';
import { EmployeeService } from './../../services/employee/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-show',
  templateUrl: './employee-show.component.html',
  styleUrls: ['./employee-show.component.scss']
})
export class EmployeeShowComponent implements OnInit {

  public employeeId: string;
  public employee: Employee;

  constructor(private activatedRoute: ActivatedRoute, private employeeService: EmployeeService) {
    this.activatedRoute.params.subscribe( parameters => {
      this.employeeId = parameters['id'];
      this.employeeService.findById( this.employeeId )
          .subscribe( employee => {
              this.employee = employee[0];
          });
    });
  }

  ngOnInit() {
  }

}
