import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ConfigUrlService } from './../../../services/config-url/config.url.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportsService {
  private endPoint: string;

  constructor(
    private http: Http,
    private configUrlService: ConfigUrlService
  ) {
    this.endPoint = `${configUrlService.getBaseUrl()}/reports`;
  }

  public getProducts(): Observable<any> {
    return this.http.get(`${this.endPoint}/getProducts`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public salesHistoryByColumnInAPeriod(params): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.endPoint}/salesHistoryByColumnInAPeriod`, params, { headers: headers })
      .map( res => res.json() || {})
      .catch( error => JSON.stringify(error));
  }

}
