import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTaskInfoComponent } from './page-task-info.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertService } from './services/alert.service';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('PageTaskInfoComponent', () => {
  let component: PageTaskInfoComponent;
  let fixture: ComponentFixture<PageTaskInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTaskInfoComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        AlertService,
        CookieService,
        DatePipe,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTaskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
