import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-addrel',
  templateUrl: './addrel.component.html',
  styleUrls: ['./addrel.component.css']
})
export class AddrelComponent implements OnInit {

  message;
  beltid;
  newRel = {cust: '', stars: '', review: ''};
  beltname;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) {}

    ngOnInit() {
      this._route.params.subscribe((params: Params) => {
        this.beltid = params['id'];
        console.log(this.beltid);
        const observable = this._httpService.getbeltbyid(this.beltid);
        observable.subscribe(data => {
          console.log('Got 1 belt', data);
          this.beltname = data['data']['name'];
          console.log('author: ', this.beltname);
        });
      });
    }

  onSubmit() {

    console.log('In on submit for addrel');
    const observable = this._httpService.addRel(this.newRel, this.beltid);
    observable.subscribe(data => {
      console.log('Added our rel!', data);
      console.log('data with message: ', data['message']);
      this.message = data['message'];
      if (data['message'] === 'Success') {
        console.log('Added Review!', data);
        this._router.navigate(['/Details', this.beltid]);
      } else {
        console.log('Review Add was unsuccessful');
      }

    });

  }


}
