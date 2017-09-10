import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'customer',
    template: `<router-outlet></router-outlet>`
})

export class CustomerComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
