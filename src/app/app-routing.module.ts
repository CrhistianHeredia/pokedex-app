import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./features/pokemon-list/pokemon-list.module').then(m => m.PokemonListModule) },
  { path: 'details/:id', loadChildren: () => import('./features/pokemon-detail/pokemon-detail.module').then(m => m.PokemonDetailModule) },
  { path: 'trainer', loadChildren: () => import('./features/trainer/trainer.module').then(m => m.TrainerModule) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
