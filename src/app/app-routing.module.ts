import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./components/pokemons/pokemons.module').then(m => m.PokemonsModule) },
  { path: 'details/:id', loadChildren: () => import('./components/details/details.module').then(m => m.DetailsModule) },
  { path: 'trainer', loadChildren: () => import('./components/trainer/trainer.module').then(m => m.TrainerModule) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
