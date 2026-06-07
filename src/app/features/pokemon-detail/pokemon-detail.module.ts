import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PokemonDetailComponent } from './pokemon-detail.component';

const routes: Routes = [
  { path: '', component: PokemonDetailComponent }
];

@NgModule({
  declarations: [PokemonDetailComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PokemonDetailModule {}
