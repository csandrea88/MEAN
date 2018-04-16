console.log('in app.component.ts');
import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tasks;
  title = 'Restful Tasks API';
  title2 = 'All the tasks:';
  title3 = 'Last task';

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    // this.getTasksFromService();
  }

  getTasksFromService() {
      const observable = this._httpService.getTasks();
      observable.subscribe(data => {
      console.log('Got our tasks!', data);
      this.tasks = data['data'];
      console.log('task: ', this.tasks);
    });
  }
  onButtonClick(): void {
    console.log(`Click event is working`);
    this.getTasksFromService();
  }


}
