//Interfaces
import { Employee } from '../../interfaces/employee';

//Services
import { ConfigUrlService } from '../config-url/config.url.service'

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeeService {

  private endPoint;

  constructor(private http: Http, private configUrlService: ConfigUrlService) { 
    this.endPoint = `${this.configUrlService.getBaseUrl()}/employee`;
  }

  public all(): Observable<Employee[]> {
    return this.http.get(`${this.endPoint}`)
      .map(res => res.json() || { })
      .catch(err =>  JSON.stringify(err));
  }

  public create(employee: Employee): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.endPoint}`, employee, {headers: headers})
      .map( res => res.json() || {})
      .catch( error => JSON.stringify(error));
  }

  public findById( id ): Observable<Employee> {
    return this.http.get(`${this.endPoint}/${id}`)
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }

  public update( employee: Employee ): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.endPoint}/${employee.employee_id}`, employee, {headers: headers})
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }

  public delete( id ): Observable<any> { // Not sure if this method works
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.endPoint}/${id}`, { headers: headers})
      .map( res => res.json() || {} )
      .catch( error => JSON.stringify(error) );
  }

}
