import { FileImportComponent } from './components/file-import/file-import.component';
import { UtilitiesService } from './services/utilities.service';
import { UtilitiesRoutingModule } from './utilities.routing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { UtilitiesComponent } from './utilities.component';
import { BackupComponent } from './components/backup/backup.component';
import { RestoreComponent } from './components/restore/restore.component';
import { HistoricComponent } from './components/historic/historic.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UtilitiesRoutingModule
    ],
    exports: [],
    declarations: [
        UtilitiesComponent,
        BackupComponent,
        RestoreComponent,
        FileSelectDirective,
        HistoricComponent,
        FileImportComponent
    ],
    providers: [UtilitiesService],
})
export class UtilitiesModule { }
