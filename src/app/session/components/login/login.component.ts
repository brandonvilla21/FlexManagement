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
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user = {
      email: '',
      password: ''
    }
  }

  ngOnInit() {
  }

  onSubmitLogin( form: NgForm ) {
    if ( form.valid ) {
      this.userService.login( this.user.email, this.user.password )
        .subscribe( res => {
          console.log(res);
        })
    }
  }

}
