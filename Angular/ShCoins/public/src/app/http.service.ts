import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class HttpService {

  bal = 0;
  trans = [];

  constructor(private _http: HttpClient) {
  }

  addBal(type) {
      console.log('in addBal');
      this.bal++;
      console.log(this.bal);
      this.addToTrans([type, 1, this.bal]);
  }

  subbal(type) {
    console.log('in subBal');
    this.bal--;
    console.log('subbal: ', this.bal);
    this.addToTrans([type, 1, this.bal]);
   }

  getbal() {
    return this.bal;
  }
  getalltrans() {
    console.log('in get all trans');
    return this.trans;
  }

  gettransbyid(id) {
    console.log('input id: ', id);
    console.log('this.trans: ', this.trans);
    return this.trans[id];
  }

  addToTrans(trans) {
    console.log('in addToTrans');
    this.trans.push(trans);
    console.log(trans);
    console.log(this.trans);
    console.log('Service Mine: ', this.trans);
  }

}

