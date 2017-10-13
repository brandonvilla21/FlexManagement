import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigUrlService } from './../../services/config-url/config.url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportsService {
  public endPoint: string;
  constructor( private http: Http, configUrlService: ConfigUrlService ) {
    this.endPoint = `${configUrlService.getBaseUrl()}/reports`;
  }

  getCustomers(): Observable<any[]> {
    console.log(`${this.endPoint}/getCustomers`);
    return this.http.get(`${this.endPoint}/getCustomers`)
      .map( res => res.json())
      .catch( res => JSON.stringify(res));
  }

}
