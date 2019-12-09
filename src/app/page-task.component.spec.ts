import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTaskComponent } from './page-task.component';
import { DatePipe } from '@angular/common';
import { TaskService } from './task.service';
import { of } from 'rxjs';
import { Task } from './task';

describe('PageTaskComponent', () => {
  let component: PageTaskComponent;
  let fixture: ComponentFixture<PageTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTaskComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        DatePipe,
        {
          provide: TaskService,
          useValue: {
            doneTask: (task: Task) => of(task),
            getTaskListOrderByAsap: () => of([]),
          },
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
