import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-page-task',
  templateUrl: './page-task.component.html',
  styleUrls: ['./page-task.component.scss']
})
export class PageTaskComponent implements OnInit {

  taskList: Task[] = [];

  constructor(private taskService: TaskService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.updateTaskList();
  }

  doneTask(task: Task) {
    this.taskService.doneTask(task).subscribe(() => {
      this.updateTaskList();
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
    if (q.getUTCFullYear() === now.getUTCFullYear()) {
      return  this.datePipe.transform(q, 'M月d日 HH:mm');
    } else {
      return  this.datePipe.transform(q, 'yyyy年M月d日 HH:mm');
    }
  }
}
