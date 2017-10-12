import { CommonModule } from '@angular/common';
import { Ng2PdfService } from './ng2-pdf.service';
import { NgModule } from '@angular/core';

import { Ng2PdfComponent } from './ng2-pdf.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
    ],
    declarations: [
    ],
    providers: [
        Ng2PdfService
    ],
})
export class Ng2PdfModule { }
