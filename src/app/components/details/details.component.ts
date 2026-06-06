import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  readonly currentId = signal(1);

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      const id = +params['id'];
      this.currentId.set(id);
      this.loadPokemon(id);
    });
  }

  typeColor = typeColor;
  typeIcon = typeIcon;
  statColor = statColor;

  goNext(): void {
    this.router.navigateByUrl(`/details/${this.currentId() + 1}`);
  }

  goPrev(): void {
    if (this.currentId() > 1) {
      this.router.navigateByUrl(`/details/${this.currentId() - 1}`);
    }
  }

  playing = false;
  audio: HTMLAudioElement | null = null;

  playCry(): void {
    if (!this.pokemon?.cries?.latest) return;
    if (this.playing) {
      this.audio?.pause();
      this.audio = null;
      this.playing = false;
      return;
    }
    this.audio = new Audio(this.pokemon.cries.latest);
    this.audio.volume = 0.3;
    this.playing = true;
    this.audio.play().catch(() => {});
    this.audio.onended = () => {
      this.playing = false;
      this.audio = null;
    };
  }

  hideIcon(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">' +
      '<circle cx="100" cy="85" r="45" fill="#e0e0e0"/>' +
      '<path d="M40 170c0-33 27-60 60-60s60 27 60 60" fill="#e0e0e0"/>' +
      '<ellipse cx="80" cy="75" rx="8" ry="10" fill="#ccc"/>' +
      '<ellipse cx="120" cy="75" rx="8" ry="10" fill="#ccc"/>' +
      '<circle cx="80" cy="75" r="3" fill="#999"/>' +
      '<circle cx="120" cy="75" r="3" fill="#999"/>' +
      '<path d="M85 100 Q100 115 115 100" stroke="#ccc" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<rect x="92" y="130" width="16" height="8" rx="4" fill="#ccc"/>' +
      '<rect x="88" y="136" width="24" height="6" rx="3" fill="#ddd"/>' +
      '</svg>'
    );
  }

  private loadPokemon(id: number): void {
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
