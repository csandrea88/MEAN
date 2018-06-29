import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class HttpService {
  increm = 1;
  constructor(private _http: HttpClient) {}

  addAuth(newAuthor) {
    console.log('in addAuth');
    console.log('newAuthor:', newAuthor);
    return this._http.post('/api/author', newAuthor);
  }
  addQuote(newQuote, authid) {
    console.log('in addQuote');
    return this._http.post(`/api/quote/${authid}`, newQuote);
  }
  getauthors() {
    console.log('in service: getAuthors');
    return this._http.get('/api/authors');
  }
  getauthorsbyid(id) {
    console.log('in getAuthbyid');
    console.log('Authorid:', id);
    return this._http.get(`/api/authorbyid/${id}`);
  }
  qvoteup(id) {
    console.log('in qvoteup id: ', id);
    return this._http.get(`/api/qvoteup/${id}`);
  }
  qvotedown(qid) {
    console.log('in qvotedown id: ', qid);
    return this._http.get(`/api/qvotedown/${qid}`);
  }
  deleteTask(id) {
    console.log('in deletequote id: ', id);
    return this._http.delete(`/api/quotedelete/${id}`);
  }
  editAuth(id, editauthor) {
    console.log('in editAuth: ', editauthor);
    return this._http.put(`/api/editauthor/${id}`, editauthor);
  }

}
