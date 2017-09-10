//Interfaces
import { Customer } from '../../customer.model';

//Services
import { ConfigUrlService } from '../../../services/config-url/config.url.service'

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomerService {

  private endPoint;

  constructor(private http: Http, private configUrlService: ConfigUrlService) {
    this.endPoint = `${this.configUrlService.getBaseUrl()}/customer`;
  }

  public all(): Observable<Customer[]> {
    return this.http.get(`${this.endPoint}`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public create(product: Customer): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.endPoint}`, product, {headers: headers})
      .map( res => res.json() || {})
      .catch( error => JSON.stringify(error));
  }

  public findById( id ): Observable<Customer> {
    return this.http.get(`${this.endPoint}/${id}`)
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }

  public update( customer: Customer ): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.endPoint}/${customer.customer_id}`, customer, {headers: headers})
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }

  public delete( id ): Observable<any> { // Not sure if this method works
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.endPoint}/id`, { headers: headers})
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }


}
