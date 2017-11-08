import { HelpRoutingModule } from './help.routing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HelpComponent } from './help.component';
import { HelpContentComponent } from './components/help-content/help-content.component';

@NgModule({
    imports: [
        CommonModule,
        HelpRoutingModule
    ],
    exports: [],
    declarations: [
        HelpComponent,
        HelpContentComponent
    ],
    providers: [],
})
export class HelpModule { }
