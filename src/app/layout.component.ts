import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from './services/alert.service';
import { DeviceService } from './services/device.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService,
              private deviceService: DeviceService) { }

  ngOnInit() {
    let pushType: number = null;
    this.alertService.hideAlert();
    this.route.queryParams.subscribe(
      params => {
        pushType = parseInt(params.pushType);
      }
    );
    if (pushType) {
      this.deviceService.postPushType(pushType).subscribe(res => {
        if (!res) {
          console.error("Fail to post pushType");
        }
      }, err => {
        console.error(err);
      });
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLogin();
  }

  pushLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  getErrorAlert(): string {
    return this.alertService.getErrorAlert();
  }

  closeErrorAlert() {
    this.alertService.closeErrorAlert();
  }

  getSuccessAlert(): string {
    return this.alertService.getSuccessAlert();
  }

  closeSuccessAlert() {
    this.alertService.closeSuccessAlert();
  }

}
