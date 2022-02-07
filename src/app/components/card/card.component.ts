import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() item: any;

  pokemon : any;

  constructor(
    private api : ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(){
    
    this.api.getPokemonDetail(this.item.name).subscribe(
      (data) => {
        this.pokemon = data;
      });
  }

  showDetail(pokemon:number){
    this.router.navigateByUrl(`/details/${pokemon}`)
  }

}
