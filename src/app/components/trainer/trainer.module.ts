import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrainerComponent } from './trainer.component';

const routes: Routes = [
  { path: '', component: TrainerComponent }
];

@NgModule({
  declarations: [TrainerComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TrainerModule {}
