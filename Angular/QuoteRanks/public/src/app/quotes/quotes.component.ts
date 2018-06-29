console.log('in quotes component.ts');
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  authorid;
  authorname;
  author;
  quoteid;


  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router
              ) {}

  ngOnInit() {
    console.log('in getauthorFromService');
    this.getQuotesByAuthor();
  }

  getQuotesByAuthor() {
    console.log('in getauthorFromService');
    this._route.params.subscribe((params: Params) => this.authorid = params['id']);
    const observable = this._httpService.getauthorsbyid(this.authorid);
    observable.subscribe(data => {
      console.log('Got 1 author', data);
      this.author = data['data'];
      console.log('author: ', this.author);
    });
  }

  clickVoteup(quoteid) {
    console.log('In clickVoteup', 'quoteid: ', quoteid);
    const observable = this._httpService.qvoteup(quoteid);
    observable.subscribe(data => {
      console.log('up Voted', data);
      this.author.quotes.forEach(function(quote) {
        if (quote._id === quoteid) {
           quote.totvotes++;
        }
      });
    });
  }
  clickVotedown(quoteid) {
    console.log('In Vote down, quoteid:', quoteid);
    const observable = this._httpService.qvotedown(quoteid);
    observable.subscribe(data => {
      console.log('down Voted', data);
      this.author.quotes.forEach(function(quote) {
        if (quote._id === quoteid) {
           quote.totvotes--;
        }
      });
    });
 }
  clickDelete(quoteid) {
    console.log('in clickdelete');
    const observable = this._httpService.deleteTask(quoteid);
    observable.subscribe(data => {
      console.log('Deleted our task!', data);
      this.getQuotesByAuthor();
    });

  }
}
