import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

describe('UnAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, CookieService],
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
