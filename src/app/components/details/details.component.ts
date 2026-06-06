import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Pokemon, EvolutionPokemon, typeColor, typeIcon, statColor } from 'src/app/models/pokemon';
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
  typeIcon = typeIcon;
  statColor = statColor;

  hideIcon(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const wrapper = img.closest('.detail-artwork');
    if (wrapper) {
      wrapper.classList.add('silhouette-visible');
    }
  }

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
