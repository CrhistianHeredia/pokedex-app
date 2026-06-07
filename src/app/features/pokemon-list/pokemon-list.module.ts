import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from '../../shared/components/card/card.component';
import { PokemonListComponent } from './pokemon-list.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent }
];

@NgModule({
  declarations: [PokemonListComponent, CardComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PokemonListModule {}
