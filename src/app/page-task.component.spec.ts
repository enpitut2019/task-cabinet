import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTaskComponent } from './page-task.component';
import { DatePipe } from '@angular/common';
import { TaskService } from './task.service';
import { of } from 'rxjs';
import { Task } from './task';
import { ServiceWorkerModule, SwPush } from '@angular/service-worker';
import { DeviceService } from './services/device.service';
import { environment } from '../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from './services/alert.service';

describe('PageTaskComponent', () => {
  let component: PageTaskComponent;
  let fixture: ComponentFixture<PageTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTaskComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        DatePipe,
        DeviceService,
        SwPush,
        CookieService,
        AlertService,
        {
          provide: TaskService,
          useValue: {
            doneTask: (task: Task) => of(task),
            getTaskListOrderByAsap: () => of([]),
          },
        },
      ],
      imports: [
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        HttpClientTestingModule
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
