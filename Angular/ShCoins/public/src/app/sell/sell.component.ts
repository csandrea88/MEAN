console.log('in sell.components.ts');
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})

export class SellComponent implements OnInit {
  Num: number;
  Message: string;
  bal;
  retBal;

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    this.retBal = this._httpService.getbal();
    console.log('bal: ', this.retBal);
  }

  onSubmit(): void {
    console.log('sell Click event is working');
    if (this.retBal > 0) {
      console.log('bal is greater than 0');
      this._httpService.subbal('Sell');
      this.retBal = this._httpService.getbal();
      this.Message = 'Sold, lose one Shinto coin';
    } else {
      this.Message = 'Sorry you do not have enough Shinto coins';
    }
    this.retBal = this._httpService.getbal();
  }
}
