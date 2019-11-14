import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTopComponent } from './page-top.component';

describe('PageTopComponent', () => {
  let component: PageTopComponent;
  let fixture: ComponentFixture<PageTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTopComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
