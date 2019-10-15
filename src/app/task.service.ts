import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, of } from 'rxjs';
import { MOCK_TASK_LIST } from './mock-task-list';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTaskList(): Observable<Task[]> {
    return of(MOCK_TASK_LIST);
  }

}
