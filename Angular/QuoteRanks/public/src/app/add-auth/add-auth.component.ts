import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-add-auth',
  templateUrl: './add-auth.component.html',
  styleUrls: ['./add-auth.component.css']
})
export class AddAuthComponent implements OnInit {

  newAuthor = {name: '', _author: ''};

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    console.log('In on submit for add');
    const observable = this._httpService.addAuth(this.newAuthor);
    observable.subscribe(data => {
      console.log('Added our author!', data);
      this._router.navigate(['/Home']);
    });

  }

}
