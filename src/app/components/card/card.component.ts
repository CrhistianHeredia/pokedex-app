import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Pokemon, PokemonListItem, typeColor } from 'src/app/models/pokemon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input({ required: true }) item!: PokemonListItem;

  pokemon: Pokemon | null = null;
  isLastEvolution = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  private loadPokemon(): void {
    this.api.getPokemonDetail(this.item.name).subscribe(data => {
      this.pokemon = data;
      this.checkIfLastEvolution(data.id);
    });
  }

  private checkIfLastEvolution(id: number): void {
    this.api.getLastEvolutions(id).subscribe(evolutions => {
      this.isLastEvolution = evolutions.some(e => e.id === id);
    });
  }

  typeColor = typeColor;

  showDetail(pokemonId: number): void {
    this.router.navigateByUrl(`/details/${pokemonId}`);
  }
}
