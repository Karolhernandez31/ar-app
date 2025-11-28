import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ArComponent } from './components/ar/ar.component';

const MODULES = [
  CommonModule,
  FormsModule,
  IonicModule
]

@NgModule({
  declarations: [ArComponent],
  imports: [
    ...MODULES
  ], exports: [
    ...MODULES,ArComponent
  ]
})
export class SharedModule { }
