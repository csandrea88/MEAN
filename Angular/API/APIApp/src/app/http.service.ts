import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HttpService {

  powers;

  constructor(private _http: HttpClient) {

    this.getPokemon();
  }

  getPokemon() {

    const bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');

    bulbasaur.subscribe(data => {
      console.log('Balbasaur is ', data['height'], 'inches tall',  data['abilities'][0].ability.name);
      this.powers = data['abilities'][0].ability.name;
    });

    const samePowerCnt = this._http.get('https://pokeapi.co/api/v2/ability/34/');

    samePowerCnt.subscribe(data => {
      console.log('same power count: ', data['pokemon'].length);
    });
  }
}
