import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime, mergeMap, of, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  pokemonList : any;
  pokemonLimit = 20;
  countPokemons :number = 0;
  numberPage  = new BehaviorSubject(0);
  pageEvent:  any = PageEvent

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadView();
  }

  loadView(){
    this.api.getPokemons().subscribe(
      (data: any) => {
        this.countPokemons = parseInt(data['count']);
        this.pokemonList = data['results'];
      }
    );
  }

  getPokemonList(event: PageEvent){
    of(event).pipe(
      debounceTime(2000),
      mergeMap( data => {
        this.numberPage.next(data.pageIndex * data.pageSize);
        return this.api.getPokemonList( data.pageSize, this.numberPage.value)
      })
    ).subscribe(
      (reponseData: any) => {
        this.countPokemons = parseInt(reponseData['count']);
        this.pokemonList = reponseData['results'];
      }
    );
  }

  searchPokemon(event:any){
    this.pokemonList = [{
      url: undefined,
      name: event.toLowerCase()
    }];
  }

}
