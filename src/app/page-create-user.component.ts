import { Component, OnInit } from '@angular/core';
import {User} from './models/user';

@Component({
  selector: 'app-page-create-user',
  templateUrl: './page-create-user.component.html',
  styleUrls: ['./page-create-user.component.scss']
})
export class PageCreateUserComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
    name: ''
  };
  isSubmitted = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(params: Array<any>) {
    this.isSubmitted = true;
    for (const param of params) {
      if (param.invalid) {
        return;
      }
    }
    alert('submit!');
  }

}
