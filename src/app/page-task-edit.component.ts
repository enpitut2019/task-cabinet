import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from './task';
import { TaskService } from './task.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-page-task-edit',
  templateUrl: './page-task-edit.component.html',
  styleUrls: ['./page-task-edit.component.scss']
})
export class PageTaskEditComponent implements OnInit {

  task: Task = {
    id: null,
    name: '',
    deadline: new Date(),
    finishedAt: null,
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

    const task: Task = {
      id: null,
      name: this.task.name,
      estimate: this.task.estimate,
      deadline: new Date(this.task.deadline),
      finishedAt: null,
    };

    this.taskService.addTask(task)
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
