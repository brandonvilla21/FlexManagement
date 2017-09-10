import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'provider',
    template: `<router-outlet></router-outlet>`
})

export class ProviderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
