import { RegistrationRoutingModule } from './registration.routing';
import { NgModule } from '@angular/core';

import { RegistrationComponent } from './registration.component';

@NgModule({
    imports: [
        RegistrationRoutingModule
    ],
    exports: [],
    declarations: [RegistrationComponent],
    providers: [],
})
export class RegistrationModule { }
