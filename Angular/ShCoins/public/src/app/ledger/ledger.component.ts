console.log('in ledger.components.ts');
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  trans;

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    console.log('ledger init rtn');
    this.trans = this._httpService.getalltrans();
    console.log('Ledger This.trans: ', this.trans);
  }


}
