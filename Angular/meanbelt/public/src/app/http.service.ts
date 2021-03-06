import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class HttpService {
  increm = 1;
  constructor(private _http: HttpClient) {}

  addBelt(newBelt) {
    console.log('in newBelt');
    console.log('newBelt:', newBelt);
    return this._http.post('/api/belt', newBelt);
  }
  // addQuote(newQuote, authid) {
  //   console.log('in addQuote');
  //   return this._http.post(`/api/quote/${authid}`, newQuote);
  // }
  getbelts() {
    console.log('in service: getbelts');
    return this._http.get('/api/belts');
  }
  getbeltbyid(id) {
    console.log('in getbeltbyid');
    console.log('beltid:', id);
    return this._http.get(`/api/belt/${id}`);
  }
  qvoteup(id) {
    console.log('in qvoteup id: ', id);
    return this._http.get(`/api/qvoteup/${id}`);
  }
  // qvotedown(qid) {
  //   console.log('in qvotedown id: ', qid);
  //   return this._http.get(`/api/qvotedown/${qid}`);
  // }
  deleteTask(id) {
    console.log('in deletebelt id: ', id);
    return this._http.delete(`/api/beltdelete/${id}`);
  }
  editbelt(id, editbelt) {
    console.log('in editBelt: ', editbelt);
    return this._http.put(`/api/editbelt/${id}`, editbelt);
  }

}
