import { ProviderService } from './services/provider/provider.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { ProviderRoutingModule } from './provider.routing';
import { FormsModule } from '@angular/forms';

import { ProvidersComponent } from './components/providers/providers.component';
import { ProviderCreateComponent } from './components/provider-create/provider-create.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ProviderRoutingModule,
    ],
    exports: [],
    declarations: [
        ProvidersComponent,
        ProviderCreateComponent
    ],
    providers: [
        ProviderService
    ],
})
export class ProviderModule { }
