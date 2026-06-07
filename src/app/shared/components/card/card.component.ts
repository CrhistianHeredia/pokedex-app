import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Pokemon, PokemonListItem, typeColor, typeIcon } from 'src/app/models/pokemon';

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
    this.api.getPokemonDetail(this.item.name).subscribe({
      next: data => {
        this.pokemon = data;
        this.checkIfLastEvolution(data.id);
      },
      error: () => {}
    });
  }

  private checkIfLastEvolution(id: number): void {
    this.api.getLastEvolutions(id).subscribe({
      next: evolutions => {
        this.isLastEvolution = evolutions.some(e => e.id === id);
      },
      error: () => {}
    });
  }

  hideIcon(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  readonly fallbackImg = 'data:image/svg+xml,' + encodeURIComponent(
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

  typeColor = typeColor;
  typeIcon = typeIcon;

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.fallbackImg;
  }

  showDetail(pokemonId: number): void {
    this.router.navigateByUrl(`/details/${pokemonId}`);
  }
}
