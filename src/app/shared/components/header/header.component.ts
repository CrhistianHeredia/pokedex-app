import { Component, EventEmitter, Inject, Input, Output, OnInit, PLATFORM_ID } from '@angular/core';
import { Location, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  @Input() pageHome = true;

  searchInput = '';
  userImgError = false;
  darkMode = false;

  constructor(
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.darkMode = document.body.classList.contains('dark-mode');
    }
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark-mode', this.darkMode);
    }
  }

  onUserImgError(): void {
    this.userImgError = true;
  }

  searchPokemon(): void {
    if (!this.searchInput.trim()) return;
    this.search.emit(this.searchInput.trim().toLowerCase());
  }

  backClicked(): void {
    this.location.back();
  }
}
