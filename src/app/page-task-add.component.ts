import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import uuid from 'uuid';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-page-task-add',
  templateUrl: './page-task-add.component.html',
  styleUrls: ['./page-task-add.component.scss']
})
export class PageTaskAddComponent implements OnInit {
  deadline: Date;
  task: Task = {
    id: uuid(),
    name: '',
    deadline: new Date(),
    estimate: 1,
  };

  constructor(
    private router: Router,
    private taskService: TaskService,
  ) { }

  ngOnInit() {
  }

  submit() {
    if (this.task.name === '') {
      return;
    }
    this.taskService.addTask(this.task).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
