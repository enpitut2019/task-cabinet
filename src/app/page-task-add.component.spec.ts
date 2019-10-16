import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTaskAddComponent } from './page-task-add.component';

describe('PageTaskAddComponent', () => {
  let component: PageTaskAddComponent;
  let fixture: ComponentFixture<PageTaskAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTaskAddComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTaskAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
