import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-sign-in',
  templateUrl: './page-sign-in.component.html',
  styleUrls: ['./page-sign-in.component.scss']
})
export class PageSignInComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  onSubmit() {
    this.router.navigate(['task']);
  }
}
