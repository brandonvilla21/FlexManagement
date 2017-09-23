import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DevolutionRoutingModule } from './devolution.routing';
import { DevolutionService } from './services/devolution.service';

import { DevolutionComponent } from './devolution.component';
import { DevolutionsComponent } from './components/devolutions/devolutions.component';
import { DevolutionShowComponent } from './components/devolution-show/devolution-show.component';
import { DevolutionCreateComponent } from './components/devolution-create/devolution-create.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DevolutionRoutingModule,
        BootstrapModalModule.forRoot({ container: document.body })
    ],
    exports: [],
    declarations: [
        DevolutionComponent,
        DevolutionsComponent,
        DevolutionShowComponent,
        DevolutionCreateComponent
    ],
    providers: [
        DevolutionService
    ],
})
export class DevolutionModule { }
