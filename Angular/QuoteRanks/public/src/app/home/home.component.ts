console.log('in home component.ts');
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  authors;

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    const observable = this._httpService.getauthors();
    observable.subscribe(data => {
      console.log('Got our authors!', data);
      this.authors = data['data'];
      console.log('aurthors: ', this.authors);
    });
  }

}
