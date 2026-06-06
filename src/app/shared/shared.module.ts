import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/template/material.module';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule],
  exports: [HeaderComponent, CommonModule, RouterModule, MaterialModule, FormsModule]
})
export class SharedModule {}
