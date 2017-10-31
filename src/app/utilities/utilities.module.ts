import { UtilitiesService } from './services/utilities.service';
import { UtilitiesRoutingModule } from './utilities.routing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UtilitiesComponent } from './utilities.component';
import { BackupComponent } from './components/backup/backup.component';
import { RestoreComponent } from './components/restore/restore.component';

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
    ],
    providers: [UtilitiesService],
})
export class UtilitiesModule { }
