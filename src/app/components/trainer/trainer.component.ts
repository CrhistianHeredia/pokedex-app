import { Component } from '@angular/core';
import { fadeSlideIn } from 'src/app/app-animations';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
  animations: [fadeSlideIn]
})
export class TrainerComponent {}
