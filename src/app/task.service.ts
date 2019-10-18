import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, of } from 'rxjs';
import { MOCK_TASK_LIST } from './mock-task-list';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly taskList: Task[];

  constructor() {
    this.taskList = MOCK_TASK_LIST;
  }

  addTask(task: Task): Observable<Task> {
    return of(task).pipe(tap((t: Task) => { this.taskList.push(t); }));
  }

  doneTask(task: Task): Observable<Task> {
    return of(task).pipe(tap((t: Task) => {
      const idx: number = this.taskList.findIndex(v => v.id === t.id);
      if (idx >= 0) {
        this.taskList.splice(idx, 1);
      }
    }));
  }

  getTaskList(): Observable<Task[]> {
    return of(this.taskList);
  }

}
