import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigUrlService } from './../../../services/config-url/config.url.service';
import { DevolutionInterface } from './../models/devolution.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DevolutionService {
  private endPoint: string;
  constructor( private http: Http, configUrlService: ConfigUrlService ) {
    this.endPoint = `${configUrlService.getBaseUrl()}/devolution`
  }

  public all(): Observable<DevolutionInterface[]> {
    return this.http.get(`${this.endPoint}`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public general(): Observable<any[]> {
    return this.http.get(`${this.endPoint}/general`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public findById( devolution_id: string ): Observable<DevolutionInterface> {
    return this.http.get(`${this.endPoint}/${devolution_id}`)
      .map( res => res.json() || {})
      .catch( err => JSON.stringify(err));
  }

  public count(): Observable<any> {
    return this.http.get(`${this.endPoint}/count`)
      .map( res => res.json() || {})
      .catch( error => JSON.stringify(error));
  }

  public create( devolution: any ) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.endPoint}`, devolution, { headers: headers })
      .map( res => res.json() || {})
      .catch( err => JSON.stringify(err));
  }

}
