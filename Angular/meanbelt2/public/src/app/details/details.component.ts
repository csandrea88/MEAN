import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Identifiers } from '@angular/compiler/src/identifiers';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  beltid;
  beltname;
  belt;
  relid;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
  console.log('in getFromService');
  this.getRelsByBelt();
  }

  getRelsByBelt() {
    console.log('in getRelsByBelt');
    this._route.params.subscribe((params: Params) => this.beltid = params['id']);
    const observable = this._httpService.getbeltbyidrels(this.beltid);
    observable.subscribe(data => {
      console.log('Got 1 belt', data);
      this.belt = data['data'];
      console.log('belt: ', this.belt);
    });
  }

  // clickVoteup(id) {

  //     console.log('In clickVoteup', 'quoteid: ', id);
  //     const observable = this._httpService.qvoteup(id);
  //     observable.subscribe(data => {
  //       console.log('up Voted', data);
  //       this.belt = data['data'];
  //       this.alreadyvoted = true;
  //       console.log(this.belt);
  //     });

  // }
  // clickDelete(id) {
  //   console.log('in clickdelete');
  //   const observable = this._httpService.deleteTask(id);
  //   observable.subscribe(data => {
  //     console.log('Delete!', data);
  //     this.getBeltsdetails();
  //     this._router.navigate(['/Home']);
  //   });
  // }
}
