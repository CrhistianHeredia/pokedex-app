import { Injectable } from '@angular/core';
import { pluck, shareReplay } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = environment.baseURL;

  constructor() { }

  getPokemons(){
    return ajax.getJSON(`${this.url}/pokemon/`).pipe(
      shareReplay()
    );
  }

  getPokemonList( limit:number, offset:number){
    return ajax.getJSON(`${this.url}/pokemon/?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetail(idOrName:string){
    return ajax.getJSON(`${this.url}/pokemon/${idOrName}`);
  }



}
