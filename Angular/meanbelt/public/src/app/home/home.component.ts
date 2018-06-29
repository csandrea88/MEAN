console.log('in home component.ts');
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  belts;

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router
    ) {}

  ngOnInit() {
    console.log('in home init');
    this.getBeltslist();
  }

  getBeltslist() {
    console.log('in getBeltslist');
    const observable = this._httpService.getbelts();
    observable.subscribe(data => {
      console.log('Got our belts!', data);
      this.belts = data['data'];
      console.log('belts: ', this.belts);
    });
  }

  clickDelete(id) {
    console.log('in clickdelete');
    const observable = this._httpService.deleteTask(id);
    observable.subscribe(data => {
      console.log('Delete!', data);
      this.getBeltslist();
    });

  }

}
