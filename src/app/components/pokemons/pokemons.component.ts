import { Component, OnInit, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PokemonListItem } from 'src/app/models/pokemon';
import { listStagger, fadeSlideIn } from 'src/app/app-animations';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
  animations: [listStagger, fadeSlideIn]
})
export class PokemonsComponent implements OnInit {
  readonly currentPage = signal(this.api.savedPageIndex);
  readonly pageSize = signal(this.api.savedPageSize);

  readonly pokemonList = this.api.pokemonList.asReadonly();
  readonly countPokemons = this.api.totalCount.asReadonly();
  readonly loading = this.api.loading.asReadonly();

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadPokemonList();
  }

  loadPokemonList(): void {
    this.api.getPokemonList(this.pageSize(), this.currentPage() * this.pageSize()).subscribe({
      error: () => this.api.loading.set(false)
    });
  }

  getPokemonList(event: PageEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.api.savedPageIndex = event.pageIndex;
    this.api.savedPageSize = event.pageSize;
    this.loadPokemonList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  searchPokemon(name: string): void {
    if (!name.trim()) {
      this.loadPokemonList();
      return;
    }
    const fakeList: PokemonListItem[] = [{
      url: '',
      name: name.toLowerCase().trim()
    }];
    this.api.pokemonList.set(fakeList);
  }
}
