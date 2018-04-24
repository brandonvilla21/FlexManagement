import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { NgForm } from '@angular/forms';
import { UserInterface } from './../../user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: UserInterface;
  public error: boolean;
  public errorMessage: string;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user = {
      email: '',
      password: ''
    }
    this.error = false;
    this.errorMessage = '';
  }

  ngOnInit() {
  }

  onSubmitLogin( form: NgForm ) {
    if ( form.valid ) {
      this.userService.login( this.user.email, this.user.password )
        .subscribe( res => {
          if (res.success) {

            // gg
            if ( this.user.email === 'admin@admin.com' && this.user.password === '123qwe') {
              localStorage.setItem('role', 'admin');
            }
            // gg
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard']);
          } else {
            console.log(res);
            this.error = true;
            this.errorMessage = res.message;
          }
        })
    }
  }

}
