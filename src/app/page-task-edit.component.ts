import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import uuid from 'uuid';
import { Task, TaskRequest } from './task';
import { TaskService } from './task.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-page-task-edit',
  templateUrl: './page-task-edit.component.html',
  styleUrls: ['./page-task-edit.component.scss']
})
export class PageTaskEditComponent implements OnInit {
  deadline: Date;
  task: Task = {
    id: uuid(),
    name: '',
    deadline: new Date(),
    finishedAt: null,
    estimate: 1,
  };
  taskRequest: TaskRequest = {
    name: '',
    deadline: 0,
    estimate: 1,
  };

  constructor(
    private router: Router,
    private taskService: TaskService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  submit() {
    if (this.task.name === '') {
      return;
    }
    this.taskRequest.name = this.task.name;
    this.taskRequest.estimate = this.task.estimate;
    this.taskRequest.deadline = new Date(this.task.deadline).getTime();
    this.taskService.addTask(this.taskRequest)
      .subscribe(
        () => {
          this.router.navigate(['task']);
        }, (error) => {
          if (error.status === 400) {
            this.alertService.showErrorAlert('バラメータを確認してください。');
          } else {
            this.alertService.showErrorAlert('タスクの追加に失敗しました。');
            console.error(error);
          }
        });
  }

}
