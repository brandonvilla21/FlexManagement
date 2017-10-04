import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionRoutingModule } from './session.routing';

import { SessionComponent } from './session.component';

@NgModule({
  imports: [
    CommonModule,
    SessionRoutingModule
  ],
  declarations: [
    SessionComponent
  ]
})
export class SessionModule { }
