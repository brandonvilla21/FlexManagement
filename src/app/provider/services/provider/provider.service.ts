import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ConfigUrlService } from './../../../services/config-url/config.url.service';
import { Provider } from '../../provider.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProviderService {
  private endPoint: string;

  constructor(
    private http: Http,
    private configUrlService: ConfigUrlService
  ) {
    this.endPoint = `${configUrlService.getBaseUrl()}/provider`;
  }

  public all(): Observable<Provider[]> {
    return this.http.get(`${this.endPoint}`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public create(provider: Provider): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.endPoint}`, provider, { headers: headers })
      .map( res => res.json() || {})
      .catch( error => JSON.stringify(error));
  }

  public findById( id ): Observable<Provider> {
    return this.http.get(`${this.endPoint}/${id}`)
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }

  public findByColumn( column: string, value: string ): Observable<Provider[]> {
    return this.http.get(`${this.endPoint}/byColumn/${column}/${value}`)
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }

  public update( provider: Provider ): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.endPoint}/${provider.provider_id}`, provider, {headers: headers})
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
