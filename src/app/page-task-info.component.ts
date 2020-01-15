import { Component, OnInit } from '@angular/core';
import { Task } from './models/task';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TaskService } from './services/task.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-page-task-info',
  templateUrl: './page-task-info.component.html',
  styleUrls: ['./page-task-info.component.scss']
})
export class PageTaskInfoComponent implements OnInit {

  task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          return this.taskService.getTask(parseInt(paramMap.get('id'), 10));
        } else {
          return of({
            id: null,
            name: '',
            deadline: new Date(),
            finishedAt: null,
            estimate: 1,
          });
        }
      })
    ).subscribe((task: Task) => {
      this.task = task;
      console.log(task);
    });
  }

}
