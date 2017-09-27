import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigUrlService } from './../../../services/config-url/config.url.service';
import { PaymentInterface } from './../models/payment.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PaymentService {
  private endPoint: string;
  constructor( private http: Http, configUrlService: ConfigUrlService ) {
    this.endPoint = `${configUrlService.getBaseUrl()}/payment`
  }

  public all(): Observable<PaymentInterface[]> {
    return this.http.get(`${this.endPoint}`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public general(): Observable<any[]> {
    return this.http.get(`${this.endPoint}/general`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public findById( payment_id: string ): Observable<PaymentInterface> {
    return this.http.get(`${this.endPoint}/${payment_id}`)
      .map( res => res.json() || {})
      .catch( err => JSON.stringify(err));
  }

  public count(): Observable<any> {
    return this.http.get(`${this.endPoint}/count`)
      .map( res => res.json() || {})
      .catch( error => JSON.stringify(error));
  }

  public create( payment: any ) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.endPoint}`, payment, { headers: headers })
      .map( res => res.json() || {})
      .catch( err => JSON.stringify(err));
  }

}
