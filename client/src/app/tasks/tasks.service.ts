import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Task } from '../task/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksUrl = 'api/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.tasksUrl}/${id}`);
  }

  setTaskComplete(id: string, done: boolean) {
    return this.http.patch<Task>(`${this.tasksUrl}/${id}`, {
      _id: id,
      done,
    });
  }

  newTask(task: Task) {
    return this.http.post<Task>(`${this.tasksUrl}`, task);
  }
}
