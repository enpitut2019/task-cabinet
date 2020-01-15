import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTaskInfoComponent } from './page-task-info.component';

describe('PageTaskInfoComponent', () => {
  let component: PageTaskInfoComponent;
  let fixture: ComponentFixture<PageTaskInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTaskInfoComponent ]
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
