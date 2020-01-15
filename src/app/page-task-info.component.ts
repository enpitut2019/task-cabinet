import { Component, OnInit } from '@angular/core';
import { Task } from './models/task';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TaskService } from './services/task.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-page-task-info',
  templateUrl: './page-task-info.component.html',
  styleUrls: ['./page-task-info.component.scss']
})
export class PageTaskInfoComponent implements OnInit {

  task: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
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
      console.log(task);
    }, error => {
      this.alertService.showErrorAlert('タスクの取得に失敗しました。');
      this.task = {
        id: null,
        name: '',
        deadline: new Date(),
        finishedAt: null,
        estimate: 1,
      };
    });
  }

  doneTask(task: Task) {
    this.taskService.doneTask(task).subscribe(() => {
      this.router.navigate(['task']);
    }, err => {
      console.error(err);
      this.alertService.showErrorAlert('タスクの完了に失敗しました。');
    });
  }

  formatDatetime(datetime: Date) {
    const q = new Date(datetime);
    const now = new Date();
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const qDayName = dayNames[q.getDay()];
    if (q.getFullYear() === now.getFullYear()) {
      return  this.datePipe.transform(q, `M月d日(${qDayName}) HH:mm`);
    } else {
      return  this.datePipe.transform(q, `yyyy年M月d日(${qDayName}) HH:mm`);
    }
  }

}
