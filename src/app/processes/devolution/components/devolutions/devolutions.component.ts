import { DevolutionInterface } from './../../models/devolution.model';
import { EmployeeService } from './../../../../employee/services/employee/employee.service';
import { DevolutionService } from './../../services/devolution.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devolutions',
  templateUrl: './devolutions.component.html',
  styleUrls: ['./devolutions.component.scss']
})
export class DevolutionsComponent implements OnInit {
  public devolutions: any[];
  constructor(
    private devolutionService: DevolutionService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.getDevolutions();
  }

  getDevolutions() {
    this.devolutionService.general()
      .subscribe( devolutions => this.devolutions = devolutions);
  }

}
