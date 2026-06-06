import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Pokemon, EvolutionPokemon, typeColor, statColor } from 'src/app/models/pokemon';
import { fadeSlideIn } from 'src/app/app-animations';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [fadeSlideIn]
})
export class DetailsComponent implements OnInit {
  title = 'Pokémon Details';
  pokemon: Pokemon | null = null;
  lastEvolutions: EvolutionPokemon[] = [];
  isLastEvolution = false;

  constructor(
    private activeRouter: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      this.loadPokemon(params['id']);
    });
  }

  typeColor = typeColor;
  statColor = statColor;

  private loadPokemon(id: string): void {
    this.api.getPokemonDetail(id).subscribe(data => {
      this.pokemon = data;

      // Cargar últimas evoluciones
      this.api.getLastEvolutions(data.id).subscribe(evolutions => {
        this.lastEvolutions = evolutions;
        this.isLastEvolution = evolutions.some(e => e.id === data.id);
      });
    });
  }
}
