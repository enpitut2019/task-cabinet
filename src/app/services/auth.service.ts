import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';

import { Login } from '../models/login';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public login(login: Login): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${environment.apiUrl}/tcs/login`, login, httpOptions)
      .toPromise()
      .then((result: any) => {
        if (result.result !== undefined && result.result.token !== undefined) {
          this.cookieService.set( 'id_token',result.result.token);
          return result.result;
        }
        else {
          return null;
        }
      }).catch((err: any) => {
        throw err;
      }
    );
  }

  logout() {
    this.cookieService.delete('id_token');
  }

  isLogin(): Boolean {
    return this.cookieService.check('id_token');
  }

  getAuthHeader(): string {
    const token = this.cookieService.get('id_token');
    if (token) {
      return 'Bearer ' + token;
    }
    else {
      undefined;
    }
  }
}
