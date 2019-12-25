import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Task } from './task';
import { TaskService } from './task.service';
import { AlertService } from './services/alert.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-page-task-edit',
  templateUrl: './page-task-edit.component.html',
  styleUrls: ['./page-task-edit.component.scss']
})
export class PageTaskEditComponent implements OnInit {

  task: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private alertService: AlertService
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
    });
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
