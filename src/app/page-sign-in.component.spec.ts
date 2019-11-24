import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { PageSignInComponent } from './page-sign-in.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from './services/alert.service';

describe('PageSignInComponent', () => {
  let component: PageSignInComponent;
  let fixture: ComponentFixture<PageSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSignInComponent ],
      imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ CookieService, AlertService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
