import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProviderComponent } from './provider.component';
import { ProviderService } from './services/provider/provider.service';
import { ProviderRoutingModule } from './provider.routing';

import { ProvidersComponent } from './components/providers/providers.component';
import { ProviderCreateComponent } from './components/provider-create/provider-create.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProviderRoutingModule,
    ],
    exports: [],
    declarations: [
        ProviderComponent,
        ProvidersComponent,
        ProviderCreateComponent
    ],
    providers: [
        ProviderService
    ],
})
export class ProviderModule { }
