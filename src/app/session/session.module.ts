import { UserService } from './services/user.service';
import { SessionRoutingModule } from './session.routing';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionComponent } from './session.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SessionRoutingModule
  ],
  declarations: [
    SessionComponent,
    LoginComponent,
    SignupComponent
  ],
  providers: [ UserService ]
})
export class SessionModule { }
