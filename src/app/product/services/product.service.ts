import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ConfigUrlService } from './../../services/config-url/config.url.service';
import { Product } from './../product.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {
  private endPoint: string;

  constructor( private http: Http, private configUrlService: ConfigUrlService ) {
    this.endPoint = `${this.configUrlService.getBaseUrl()}/product`;
  }

  public all(): Observable<Product[]> {
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

  public findById( id ): Observable<Product> {
    return this.http.get(`${this.endPoint}/${id}`)
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }

  public findByColumn( column: string, element: string ): Observable<Product[]> {
    return this.http.get(`${this.endPoint}/byColumn/${column}/${element}`)
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }

  public update( product: Product ): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.endPoint}/${product.product_id}`, product, {headers: headers})
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
