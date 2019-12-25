import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post(`${environment.apiUrl}/tcs/user/${this.authService.getUserId()}/task`, {
      name: task.name,
      deadline: task.deadline.getTime(),
      estimate: task.estimate,
    }, {
      headers: new HttpHeaders({
        Authorization: this.authService.getAuthHeader(),
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    }).pipe(map((response: any): Task => {
      if (response.result === undefined) {
        throw new Error('fail to get task list.');
      }
      return {
        id: response.result.id,
        name: response.result.name,
        deadline: new Date(response.result.deadline),
        finishedAt: response.result.finished_at ?
          new Date(response.result.finished_at) : null,
        estimate: response.result.estimate,
      };
    }));
  }

  editTask(task: Task): Observable<Task> {
    if (task.id === undefined || task.id === null) {
      return throwError('task id must exists.');
    }

    return this.http.patch(`${environment.apiUrl}/tcs/user/${this.authService.getUserId()}/task/${task.id}`, {
      name: task.name,
      deadline: task.deadline.getTime(),
      estimate: task.estimate,
    }, {
      headers: new HttpHeaders({
        Authorization: this.authService.getAuthHeader(),
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    }).pipe(map((response: any): Task => {
      if (response.result === undefined) {
        throw new Error('fail to update task list.');
      }
      return {
        id: task.id,
        name: response.result.name,
        deadline: new Date(response.result.deadline),
        finishedAt: response.result.finished_at ?
          new Date(response.result.finished_at) : null,
        estimate: response.result.estimate,
      };
    }));
  }

  doneTask(task: Task): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/tcs/user/${this.authService.getUserId()}/task/${parseInt(task.id, 10)}/complete`, {}, {
      headers: new HttpHeaders({
        Authorization: this.authService.getAuthHeader(),
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      observe: 'response'
    }).pipe(map((response: any): boolean => {
      console.log(response);
      if (response.status !== 200) {
        throw new Error('fail to get task list.');
      }
      return true;
    }));
  }

  getTask(id: number): Observable<Task> {
    return this.http.get(`${environment.apiUrl}/tcs/user/${this.authService.getUserId()}/task/${id}`, {
      headers: new HttpHeaders({
        Authorization: this.authService.getAuthHeader(),
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    }).pipe(map((response: any): Task => {
      if (response.result === undefined) {
        throw new Error('fail to get task list.');
      }
      return {
        id: response.result.id,
        name: response.result.name,
        deadline: new Date(response.result.deadline),
        finishedAt: response.result.finished_at ?
          new Date(response.result.finished_at) : null,
        estimate: response.result.estimate,
      };
    }));
  }

  getTaskList(): Observable<Task[]> {
    return this.http.get(`${environment.apiUrl}/tcs/user/${this.authService.getUserId()}/task-list?all=true`, {
      headers: new HttpHeaders({
        Authorization: this.authService.getAuthHeader(),
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    }).pipe(map((response: any): Task[] => {
      if (response.result === undefined) {
        throw new Error('fail to get task list.');
      }

      return response.result.map((task: any): Task => {
        return {
          id: task.id,
          name: task.name,
          deadline: new Date(task.deadline),
          finishedAt: task.finished_at ? new Date(task.finished_at) : null,
          estimate: task.estimate,
        };
      });
    }));
  }

  getTaskListOrderByAsap(): Observable<Task[]> {
    return this.getTaskList().pipe(map((taskList: Task[]) => {
      const filteredList: Task[] = taskList.filter((task: Task) => task.finishedAt === null);
      return filteredList.sort((t1: Task, t2: Task) => {
        return t1.deadline.valueOf() - t2.deadline.valueOf();
      });
    }));
  }

}
