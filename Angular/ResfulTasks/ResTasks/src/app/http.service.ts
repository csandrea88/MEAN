console.log('in http.services.ts');

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class HttpService {

  constructor(private _http: HttpClient) {
    this.getTasks();
    this.getSingleTask('5acd2b591f3592b84721c93a');
  }
  getTasks() {
    // our http response is an Observable, store it in a variable
    const tempObservable = this._http.get('/tasks');
    console.log(tempObservable);

    // subscribe to the Observable and provide the code we would like to do with our data from the response
    tempObservable.subscribe(data => console.log('Got our tasks!', data));
  }

  getSingleTask(id) {
    console.log(id);
    // our http response is an temp2Observable, store it in a variable
    const temp2Observable = this._http.get(`/tasks/${id}`);
    console.log(temp2Observable);

    temp2Observable.subscribe(data => console.log('Got our single task!', data));
  }
}
