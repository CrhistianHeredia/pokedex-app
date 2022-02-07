import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  title = "Pokémon Details"
  pokemon : any;

  constructor(
    private activeRouter : ActivatedRoute,
    private api: ApiService,
    ){
      this.activeRouter.params.subscribe(
        params =>{
          this.loadDataPokemon(params['id']);
        }
      )
    }

  loadDataPokemon(id: string){
    this.api.getPokemonDetail(id).subscribe(
      apiRespons => {
        this.pokemon = apiRespons;
      }
    );
  }
}
