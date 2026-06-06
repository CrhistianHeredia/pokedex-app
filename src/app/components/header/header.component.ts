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
    this.search.emit(this.searchInput);
  }

  backClicked(): void {
    this.location.back();
  }
}
