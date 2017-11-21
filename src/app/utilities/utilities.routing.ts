import { RestoreComponent } from './components/restore/restore.component';
import { BackupComponent } from './components/backup/backup.component';
import { HistoricComponent } from 'app/utilities/components/historic/historic.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtilitiesComponent } from './utilities.component';

const routes: Routes = [
    {
        path: '',
        component: UtilitiesComponent,
        children: [
            { path: 'backup', component: BackupComponent },
            { path: 'restore', component: RestoreComponent },
            { path: 'historic', component: HistoricComponent },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilitiesRoutingModule { }

export const routedComponents = [UtilitiesComponent];
