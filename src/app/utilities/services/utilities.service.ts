import { Http, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigUrlService } from './../../services/config-url/config.url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {
  public endPoint: string;
  constructor( private http: Http, configUrlService: ConfigUrlService ) {
    this.endPoint = `${configUrlService.getBaseUrl()}/utilities`;
  }

  public getBackup(): Observable<any> {
    return this.http.get(`${this.endPoint}/backup`, { responseType: ResponseContentType.Blob })
    .map(res => res.blob())
    .catch( res => JSON.stringify(res));
  }

}
