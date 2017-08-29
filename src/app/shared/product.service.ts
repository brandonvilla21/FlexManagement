import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Product } from './../interfaces/product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {
  private endPoint = 'http://localhost:3000/products';

  constructor( private http: Http ) { }

  public all(): Observable<Product[]> {
    // const headers = new Headers({'Contet-Type': 'application/json'});

    return this.http.get(`${this.endPoint}`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

}
