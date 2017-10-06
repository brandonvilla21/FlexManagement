import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { NgForm } from '@angular/forms';
import { UserInterface } from './../../user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public user: UserInterface;
  public validatePassword: string;
  public error: boolean;
  public errorMessage: string;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user = {
      username: '',
      email: '',
      password: ''
    }
    this.validatePassword = '';
   }

  ngOnInit() {
  }

  onSubmitSignup( form: NgForm ) {
    if ( form.valid ) {
      if ( this.passwordsMathes() ) {
        this.userService.register( this.user )
          .subscribe( res => {
             if ( res.success ) {
               console.log(res);
               this.router.navigate(['/login']);
             } else {
               console.log(res);
               this.error = true;
               this.errorMessage = res.message;
             }
          })
      } else {
        this.error = true;
        this.errorMessage = 'Las contraseñas no coinciden';
      }
    }
  }

  passwordsMathes() {
    return this.validatePassword === this.user.password
  }


}
