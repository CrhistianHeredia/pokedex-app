import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();
  @Input() pageHome = true;

  searchInput = '';

  constructor(private location: Location) {}

  searchPokemon(): void {
    if (!this.searchInput.trim()) return;
    this.search.emit(this.searchInput.trim().toLowerCase());
  }

  backClicked(): void {
    this.location.back();
  }
}
