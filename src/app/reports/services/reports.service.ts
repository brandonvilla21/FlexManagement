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
    return this.http.get(`${this.endPoint}/getCustomers`)
      .map( res => res.json())
      .catch( res => JSON.stringify(res));
  }
  getSalesToPay(): Observable<any[]> {
    return this.http.get(`${this.endPoint}/salesToPay`)
      .map( res => res.json())
      .catch( res => JSON.stringify(res));
  }

  public getProducts(): Observable<any> {
    return this.http.get(`${this.endPoint}/getProducts`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public salesHistoryByColumnInAPeriod(params): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.endPoint}/salesHistoryByColumnAndSaleTypeInAPeriod`, params, { headers: headers })
      .map( res => res.json() || {})
      .catch( error => JSON.stringify(error));
  }

}
