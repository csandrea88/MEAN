import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  message;
  newBelt = {name: '', type: '', description: '', skill1: '', skill2: '', skill3: ''};

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    console.log('In on submit for add');
    const observable = this._httpService.addBelt(this.newBelt);
    observable.subscribe(data => {
      console.log('Added our belt!', data);
      this._router.navigate(['/Home']);
    });

  }
}
