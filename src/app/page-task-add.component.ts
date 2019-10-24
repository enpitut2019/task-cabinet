import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import uuid from 'uuid';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

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
    this.taskService.addTask(this.task).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
