import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { TrainerComponent } from './components/trainer/trainer.component';

const routes: Routes = [
  {path: 'home', component: PokemonsComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'trainer', component: TrainerComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
