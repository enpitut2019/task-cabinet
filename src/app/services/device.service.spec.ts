import { TestBed } from '@angular/core/testing';

import { DeviceService } from './device.service';
import { ServiceWorkerModule, SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

describe('DeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [SwPush, CookieService],
    imports: [
      HttpClientTestingModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
  }));

  it('should be created', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    expect(service).toBeTruthy();
  });
});
