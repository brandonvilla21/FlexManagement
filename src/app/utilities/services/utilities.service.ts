import { Http, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigUrlService } from './../../services/config-url/config.url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {
  public endPoint: string;
  constructor( private http: Http, private configUrlService: ConfigUrlService ) {
    this.endPoint = `${configUrlService.getBaseUrl()}/utilities`;
  }

  public getBackup(params: Object): Observable<any> {
    return this.http.post(`${this.endPoint}/backup`, params, { responseType: ResponseContentType.Blob })
  }

  public generateHistoric(params: Object): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(`${this.configUrlService.getBaseUrl()}/historic`, params, {headers} )
  }

}
