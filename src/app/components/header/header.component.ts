import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() search = new EventEmitter;
  @Input() pageHome = true;

  searchInput: string = "";
  showFiller = false;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void { }

  searchPokemon(){
    this.search.emit(this.searchInput);
  }

  backClicked() {
    this.location.back();
  }
}
