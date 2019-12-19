import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SwPush } from '@angular/service-worker';
import { Device } from '../models/device';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private swPush: SwPush, private http: HttpClient, private authService: AuthService) {
  }

  private static arrayBufferToBase64(arrayBuffer): string {
    const binary = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
    return window.btoa(binary).replace(/\+/g, '-').replace(/\//g, '_');
  }

  subscribePush(): Observable<Device> {
    return new Observable((observer => {
      this.getKey()
        .then(device => {
          this.http.post(`${environment.apiUrl}/tcs/users/${this.authService.getUserId()}/device`, device, {
            headers: new HttpHeaders({
              Authorization: this.authService.getAuthHeader(),
              'Content-Type': 'application/json',
            }),
          }).subscribe((response: any) => {
            if (response.result === undefined) {
              observer.error(new Error('Fail to post device information'));
            }
            observer.next(response.result);
          }, err => {
            if (err.status === 409) {  // ConflictなのでOKとする
              return observer.next(device);
            }
            observer.error(err);
          });
        }).catch(err => {
        observer.error(err);
      });
    }));
  }

  unSubscribePush(): Observable<void> {
    return new Observable((observer => {
      this.getKey()
        .then(device => {
          this.http.request('delete', `${environment.apiUrl}/tcs/users/${this.authService.getUserId()}/device`, {
            headers: new HttpHeaders({
              Authorization: this.authService.getAuthHeader(),
              'Content-Type': 'application/json',
            }),
            body: device,
            observe: 'response'  // For get status
          }).subscribe((response: any) => {
            if (response.status !== 200) {
              return observer.error(new Error('Fail to Delete device information.'));
            }
            observer.next();
          }, err => {
            observer.error(err);
          });
        }).catch(err => {
        observer.error(err);
      });
    }));
  }

  checkIsSubscribing(): Observable<boolean> {
    return new Observable((observer => {
      this.getKey()
        .then(device => {
          this.http.post(`${environment.apiUrl}/tcs/users/${this.authService.getUserId()}/check-device`, device, {
            headers: new HttpHeaders({
              Authorization: this.authService.getAuthHeader(),
              'Content-Type': 'application/json',
            }),
          }).subscribe((response: any) => {
            if (response.result === undefined) {
              observer.error(new Error('Fail to post device information'));
            }
            console.log(response);
            observer.next(response.result.is_exist === 1);
          }, err => {
            observer.error(err);
          });
        }).catch(err => {
        observer.error(err);
      });
    }));
  }

  getKey(): Promise<Device> {
    return this.swPush.requestSubscription({serverPublicKey: environment.vapIdPublicKey})
      .then(sub => {
        return {
          endpoint: sub.endpoint,
          keys: {
            auth: DeviceService.arrayBufferToBase64(sub.getKey('auth')),
            p256dh: DeviceService.arrayBufferToBase64(sub.getKey('p256dh'))
          }
        };
      })
      .catch(err => {
        throw err;
      });
  }
}
