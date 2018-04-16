console.log('in app.component.ts');
import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  newTask: any;
  tasks;
  task;
  showEditform: boolean;

  // constructor() {}
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    this.newTask = { title: '', description: '' };
    console.log (this.newTask);
    this.getTasksFromService();
    this.showEditform = false;
  }

  getTasksFromService() {
      const observable = this._httpService.getTasks();
      observable.subscribe(data => {
      console.log('Got our tasks!', data);
      this.tasks = data['data'];
      console.log('task: ', this.tasks);
    });
  }

  onButtonClick(task): void {
    console.log(`in onButtonClick`, task._id);
    const observable = this._httpService.getSingleTask(task._id);
    observable.subscribe(data => {
      console.log('Got our task!', data);
      this.task = data['data'];
      this.showEditform = true;
    });
  }

  onSubmitUpdate() {
    console.log('in onsubmitupdate');
    const observable = this._httpService.putTask(this.task);
    observable.subscribe(data => {
      console.log('Updated our task!', data);
      this.showEditform = false;
      this.getTasksFromService();
    });
  }

  onSubmitDelete(task) {
    console.log('in onsubmitdelete');
    const observable = this._httpService.deleteTask(task._id);
    observable.subscribe(data => {
      console.log('Deleted our task!', data);
      this.getTasksFromService();
    });
  }

  onSubmitAdd() {
    console.log('In on submit for add');
    const observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log('Added our task!', data);
      this.newTask = { title: '', descriptn: '' };
      this.getTasksFromService();
    });

  }
}
