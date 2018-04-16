console.log('in mine.components.ts');
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';


@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})

export class MineComponent implements OnInit {
  Num: number;
  Message: string;

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
  }

  onSubmitMine(): void {
    console.log('mine Click event is working');
    console.log('Num: ', this.Num);
    if (this.Num === 21) {
      console.log('num is 21');
      this._httpService.addBal('Mine');
      this.Message = 'Correct you were granted one Shinto coin';
    } else {
      this.Message = 'Incorrect Answer, keep trying';
    }
  }

}
