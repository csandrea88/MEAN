console.log('in home component.ts');
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit {

authorid;
newQuote = {quote: ''};
quoteid;
Message = '';

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.authorid = params['id'];
      console.log(this.authorid);
    });
    console.log('Outside of params: ', this.authorid);
  }


  onSubmit() {
    console.log('In on submit for addquote');
    const observable = this._httpService.addQuote(this.newQuote, this.authorid);
    observable.subscribe(data => {
      console.log('Added new quote!', data);
      // if (!data['err']) {
      //   this.Message = 'Quote invalid; try again';
      // } else {
      //   console.log('trying to navigate');
      this._router.navigate(['/QuotesByAuth', this.authorid]);

    });
  }
}
