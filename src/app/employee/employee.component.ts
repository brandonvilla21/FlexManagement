import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'employee',
    template: `<router-outlet></router-outlet>`
})

export class EmployeeComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
