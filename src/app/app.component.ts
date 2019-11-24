import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: AuthService, useClass: AuthService },
    { provide: AlertService, useClass: AlertService }
  ],
})
export class AppComponent {}
