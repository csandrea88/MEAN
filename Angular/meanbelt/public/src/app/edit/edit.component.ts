import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editBelt = {name: ''};
  id;
  belt;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
    console.log('in edit init');
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    console.log(this.id);
    const observable = this._httpService.getbeltbyid(this.id);
    observable.subscribe(data => {
      console.log('Got the belt!', data);
      this.belt = data['data'];
      console.log(this.belt);
    });
  }

  onSubmit() {
    console.log('In on submit for edit author');
    const observable = this._httpService.editbelt(this.id, this.editBelt);
    observable.subscribe(data => {
      console.log('Updated!', data);
      this._router.navigate(['/Home']);
    });

  }


}
