console.log('in ledgerid.components.ts');
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-ledger-id',
  templateUrl: './ledger-id.component.html',
  styleUrls: ['./ledger-id.component.css']
})
export class LedgerIdComponent implements OnInit {
  transbyid;
  id;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute) {}

  ngOnInit() {
    console.log('ledgerid init rtn');
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    console.log('this.id: ', this.id);
    this.transbyid = this._httpService.gettransbyid(this.id);
    console.log('Ledgerid This.trans: ', this.transbyid);
  }

}
