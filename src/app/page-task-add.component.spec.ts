import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDatepickerModule, MatInputModule, MatSliderModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { PageTaskAddComponent } from './page-task-add.component';

describe('PageTaskAddComponent', () => {
  let component: PageTaskAddComponent;
  let fixture: ComponentFixture<PageTaskAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTaskAddComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        MatDatepickerModule,
        MatMomentDateModule,
        FormsModule,
        MatInputModule,
        MatSliderModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
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
