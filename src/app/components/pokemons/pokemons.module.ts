import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from '../card/card.component';
import { PokemonsComponent } from './pokemons.component';

const routes: Routes = [
  { path: '', component: PokemonsComponent }
];

@NgModule({
  declarations: [PokemonsComponent, CardComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PokemonsModule {}
