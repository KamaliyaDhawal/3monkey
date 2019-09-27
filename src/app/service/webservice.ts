import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { Observable, throwError, of, Subject } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

export interface Config {
  statusCode: string;
  message: string;
}

@Injectable()
export class Webservice {
  configUrl = 'http://3monkeys.xtremejobs.net/api/';
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
  })
}
lang: any = localStorage.getItem('lang')? localStorage.getItem('lang'):1;

  constructor(private http: HttpClient) { }


  getProjects(cat) {
    var lang = this.lang;
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    return this.http.get<Config>(this.configUrl + 'project/'+ lang +'/' + cat , this.httpOptions).pipe(res => res);
  }

  getReels() {
    // var lang = 1;
    var lang = this.lang;;
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    return this.http.get<Config>(this.configUrl + 'general/'+ lang , this.httpOptions).pipe(res => res);
  }

  getProjectDetail(id) {
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    return this.http.get<Config>(this.configUrl + 'projectDetail/'+ id , this.httpOptions).pipe(res => res);
  }

  getReelDetail(id) {
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    return this.http.get<Config>(this.configUrl + 'general/detail/'+ id , this.httpOptions).pipe(res => res);
  }

  getGeneralMenu() { 
    // var lang =1;
    var lang = this.lang;
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    return this.http.get<Config>(this.configUrl + 'general/menu/'+ lang , this.httpOptions).pipe(res => res);
  }

  getlocationMenu() { 
    // var lang =1;
    var lang = this.lang;
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    return this.http.get<Config>(this.configUrl + 'location/menu/'+ lang , this.httpOptions).pipe(res => res);
  }

  getMonkeyMenu() { 
    // var lang =1;
    var lang = this.lang;
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    return this.http.get<Config>(this.configUrl + 'monkeysWorld/'+ lang , this.httpOptions).pipe(res => res);
  }

  addCategory(data) {
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': localStorage.getItem('token')
        })
    };
    return this.http.post<Config>(this.configUrl + '/category', data, this.httpOptions).pipe(res => res);
  }

  editCategory(data) {
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': localStorage.getItem('token')
        })
    };
    const id = data.map.get('id');
    return this.http.put<Config>(this.configUrl + '/category/' + id , data, this.httpOptions).pipe(res => res);
  }


}
