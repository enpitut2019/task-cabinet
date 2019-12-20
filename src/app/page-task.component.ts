import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { DatePipe } from '@angular/common';
import { DeviceService } from './services/device.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-page-task',
  templateUrl: './page-task.component.html',
  styleUrls: ['./page-task.component.scss']
})
export class PageTaskComponent implements OnInit {

  taskList: Task[] = [];
  isSubscribing: boolean;

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
      this.updateTaskList();
    }, err => {
      console.error(err);
      this.alertService.showErrorAlert('タスクの完了に失敗しました。');
    });
  }

  updateTaskList() {
    this.taskService.getTaskListOrderByAsap().subscribe((taskList) => {
      this.taskList = taskList;
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
