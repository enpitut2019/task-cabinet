import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-page-task',
  templateUrl: './page-task.component.html',
  styleUrls: ['./page-task.component.scss']
})
export class PageTaskComponent implements OnInit {

  taskList: Task[] = [];

  constructor(private taskService: TaskService) { }

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
}
