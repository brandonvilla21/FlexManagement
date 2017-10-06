import { UserInterface } from './../user.model';
import { ConfigUrlService } from './../../services/config-url/config.url.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  public endPoint: string;
  constructor( private http: Http, private configUrlService: ConfigUrlService ) {
    this.endPoint = `${this.configUrlService.getBaseUrl()}/user`;
  }

  public register( user: UserInterface ) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.endPoint}/register`, user, { headers: headers })
      .map( res => res.json() )
      .catch( err =>  JSON.stringify(err) );
  }

  public login( email, password ) {
    const credentails = {
      email: email,
      password: password
    }

    const headers = new Headers({ 'Content-Type': 'application/json' });
    return  this.http.post(`${this.endPoint}/login`, credentails, { headers: headers} )
    .map( res => res.json() )
    .catch( err =>  JSON.stringify(err) );
  }

}
