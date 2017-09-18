import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ConfigUrlService } from './../../services/config-url/config.url.service';
import { PurchaseProductInterface } from './../models/purchase-product.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PurchaseProductService {
  private endPoint: string;

  constructor( private http: Http, configUrlService: ConfigUrlService ) {
    this.endPoint = `${configUrlService.getBaseUrl()}/purchaseProduct`
  }

  public all(): Observable<PurchaseProductInterface[]> {
    return this.http.get(`${this.endPoint}`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public general(): Observable<any[]> {
    return this.http.get(`${this.endPoint}/general`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public count(): Observable<Object> {
    return this.http.get(`${this.endPoint}/count`)
      .map( res => res.json())
      .catch( err => JSON.stringify(err) );
  }

  public findById( id ): Observable<PurchaseProductInterface> {
    return this.http.get(`${this.endPoint}/${id}`)
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }

  public findByIdJoin( id ): Observable<any> {
    return this.http.get(`${this.endPoint}/join/${id}`)
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }

  public create( purchaseProduct: PurchaseProductInterface): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.endPoint}`, purchaseProduct, {headers: headers})
      .map( res => res.json() || {})
      .catch( error => JSON.stringify(error));
  }
}
