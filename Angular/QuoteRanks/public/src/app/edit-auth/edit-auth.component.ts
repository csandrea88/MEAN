import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-auth',
  templateUrl: './edit-auth.component.html',
  styleUrls: ['./edit-auth.component.css']
})
export class EditAuthComponent implements OnInit {

  editAuthor = {name: '', _author: ''};
  authorid;
  author = {name: '', _author: ''};

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.authorid = params['id']);
    const observable = this._httpService.getauthorsbyid(this.authorid);
    observable.subscribe(data => {
      console.log('Got the author!', data);
      this.editAuthor = data['data'];
      this.author = data['data'];
    });
  }

  onSubmit() {
    console.log('In on submit for edit author');
    const observable = this._httpService.editAuth(this.authorid, this.editAuthor);
    observable.subscribe(data => {
      console.log('Added our author!', data);
      this._router.navigate(['/Home']);
    });

  }


}
