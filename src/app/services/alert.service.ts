import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

class Alert {
  constructor(
    public message: string,
    public showAfter: boolean
  ) { }
}

export class AlertService {

  error: Alert = {
    message: '',
    showAfter: false
  };
  success: Alert = {
    message: '',
    showAfter: false
  };

  constructor() { }

  public hideAlert() {
    if (this.error.showAfter) {
      this.error.showAfter = false;
    } else {
      this.closeErrorAlert();
    }
    if (this.success.showAfter) {
      this.success.showAfter = false;
    } else {
      this.closeSuccessAlert();
    }
  }

  public showErrorAlert(msg: string, showAfter: boolean = false) {
    this.error.message = msg;
    this.error.showAfter = showAfter;
  }

  public getErrorAlert(): string {
    return this.error.message;
  }

  public closeErrorAlert() {
    this.error.message = '';
  }

  public showSuccessAlert(msg: string, showAfter: boolean = false) {
    this.success.message = msg;
    this.success.showAfter = showAfter;
  }

  public getSuccessAlert(): string {
    return this.success.message;
  }

  public closeSuccessAlert() {
    this.success.message = '';
  }
}
