import { Component, OnInit } from '@angular/core';
import { Task } from './models/task';
import { TaskService } from './services/task.service';
import { DatePipe } from '@angular/common';
import { DeviceService } from './services/device.service';
import { AlertService } from './services/alert.service';
import { Observable, timer } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-page-task',
  templateUrl: './page-task.component.html',
  styleUrls: ['./page-task.component.scss'],
  animations: [
    trigger('taskState', [
      state('open', style({
      })),
      state('close', style({
        height: 0,
        margin: 0,
        padding: 0,
        opacity: 0,
        display: 'none',
      })),
      transition('open => close', [
        animate('0.2s')
      ]),
    ]),
  ]
})
export class PageTaskComponent implements OnInit {

  taskList: { task: Task, closing: boolean }[] = [];
  isSubscribing: boolean;

  orderTypesValue = 'asap';
  orderTypes: { value: string, viewValue: string }[] = [
    { value: 'asap', viewValue: '期限の近い順' },
    { value: 'estimate', viewValue: '見積もりの高い順' },
  ];

  constructor(
    private taskService: TaskService,
    private datePipe: DatePipe,
    private deviceService: DeviceService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
    this.updateTaskList();
    this.deviceService.checkIsSubscribing().subscribe(
      isSub => {
        this.isSubscribing = isSub;
      }, err => {
        console.error(err);
        this.isSubscribing = false;
      }
    );
  }

  onSubscribe() {
    this.deviceService.subscribePush().subscribe(
      () => {
        this.isSubscribing = true;
        this.alertService.showSuccessAlert('通知をONに設定しました。');
      }, err => {
        this.alertService.showErrorAlert('通知の設定に失敗しました。');
      });
  }

  onUnsubscribe() {
    this.deviceService.unSubscribePush().subscribe(
      () => {
        this.isSubscribing = false;
        this.alertService.showSuccessAlert('通知をOFFに設定しました。');
      }, err => {
        this.alertService.showErrorAlert('通知の設定に失敗しました。');
      });
  }

  doneTask(task: Task) {
    this.taskService.doneTask(task).subscribe(() => {
      const doneIndex: number = this.taskList.findIndex((value: { task: Task, closing: boolean }) => {
        return task.id === value.task.id;
      });

      if (doneIndex >= 0) {
        this.taskList[doneIndex].closing = true;
        timer(200).subscribe(() => {
          this.updateTaskList();
        });
      } else {
        this.updateTaskList();
      }
    }, err => {
      console.error(err);
      this.alertService.showErrorAlert('タスクの完了に失敗しました。');
    });
  }

  updateTaskList() {
    console.log('update');
    let observer: Observable<Task[]> | null = null;
    switch (this.orderTypesValue) {
      case 'asap':
        observer = this.taskService.getTaskListOrderByAsap();
        break;
      case 'estimate':
        observer = this.taskService.getTaskListOrderByEstimate();
        break;
    }

    if (observer !== null) {
      observer.subscribe((taskList) => {
        this.taskList = taskList.map((value: Task) => {
          return { task: value, closing: false };
        });
      });
    }
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
