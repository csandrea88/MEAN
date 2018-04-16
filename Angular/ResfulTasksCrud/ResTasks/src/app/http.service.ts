import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class HttpService {

  constructor(private _http: HttpClient) {
  }

  getTasks() {
    return this._http.get('/tasks');
  }

  getSingleTask(id) {
    return this._http.get(`/tasks/${id}`);
  }

  addTask(newtask) {
    console.log('in addtask');
    return this._http.post('/task', newtask);
  }

  putTask(task) {
    return this._http.put(`/task/${task._id}`, task);
  }

  deleteTask(id) {
    return this._http.delete(`/task/${id}`);
  }
}
