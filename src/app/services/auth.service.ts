import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Login } from '../models/login';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

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
          // 30 days
          this.cookieService.set('user_token', result.result.token, 30);
          this.cookieService.set('user_id', result.result.id, 30);
          return result.result;
        } else {
          return null;
        }
      }).catch((err: any) => {
        throw err;
      }
    );
  }

  public signUp(user: User): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${environment.apiUrl}/tcs/user`, user, httpOptions)
      .toPromise()
      .then((result: any) => {
        if (result.result !== undefined && result.result.id !== undefined) {
          return result.result;
        } else {
          console.error(result);
          throw new Error('Fail to save user.');
        }
      }).catch((err: any) => {
          throw err;
        }
      );
  }

  logout() {
    if (!this.isLogin()) {
      return;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader()
      })
    };
    this.http.put(`${environment.apiUrl}/tcs/user/${this.getUserId()}/logout`, null, httpOptions)
      .toPromise()
      .catch(err => console.error(err));
    this.cookieService.delete('user_token');
    this.cookieService.delete('user_id');
  }

  isLogin(): boolean {
    return this.cookieService.check('user_token');
  }

  getUserId(): number {
    const userId = this.cookieService.get('user_id');
    if (userId) {
      return parseInt(userId, 10);
    } else {
      return null;
    }
  }

  getAuthHeader(): string {
    const token = this.cookieService.get('user_token');
    if (token) {
      return token;
    } else {
      return null;
    }
  }
}
