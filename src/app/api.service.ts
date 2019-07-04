import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  loginData: any;
  page = '';
  headerMenu = 1;

  headers = { headers: new Headers({ 'content-type': 'application/Json' }) };
  options = new RequestOptions();

  constructor(private _http: Http) {  console.log('service statrted');}
  getcallsetup() {
    console.log('data entered in api service');
    return this.callApi(' http://192.168.2.115:5050/users', 'get', {});
   
  }
  insert(data){
    console.log('data inserted in api service');
    return this.callApi(' http://192.168.2.115:5050/insert', 'post',data);
  }
  addData(temp) {
    console.log('login DATA', temp);
    return this.callApi('http://192.168.2.115:5050/Authentication', 'post', temp);
  }
  updateData(temp){
    console.log('update data',temp);
    return this.callApi('http://192.168.2.115:5050/update', 'post', temp);
  }
  deletedata(del){
    console.log('deleted data',del);
    return this.callApi('http://192.168.2.115:5050/delete', 'post',del);
  }

  // getcallsetup1() {
  //   console.log('data entered in api service');
  //   return this.callApi(' http://192.168.2.115:5050/auth', 'get', {});
   
  // }
  callApi(url, method, body = null): Observable<any> {
    switch (method.toUpperCase()) {
      case 'LOGIN':
        return this._http.post(url, body).pipe(map((response: Response) => response.json()));
      case 'POST':
        return this._http
          .post(url, body, this.token())
          .pipe(map((response: Response) => response.json()));

      case 'PATCH':
        return this._http
          .patch(url, body, this.token())
          .pipe(map((response: Response) => response.json()));

      case 'DELETE':
        return this._http
          .delete(url, this.token())
          .pipe(map((response: Response) => response.json()));


      case 'GET':
        return this._http.get(url, body).pipe(map((response: Response) => response.json()));
    }
  }

  token() {
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'BEARER ' + sessionStorage.getItem('token')
      })
    });
  }
}

