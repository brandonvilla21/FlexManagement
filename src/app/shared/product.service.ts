import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Product } from './../interfaces/product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {
  private endPoint = 'http://localhost:3000/product';

  constructor( private http: Http ) { }

  public all(): Observable<any[]> {
    return this.http.get(`${this.endPoint}`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public create(product: Product): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.endPoint}`, product, {headers: headers})
      .map( res => res.json() || {})
      .catch( error => JSON.stringify(error));
  }

}
