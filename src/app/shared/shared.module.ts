import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArComponent } from './components/ar/ar.component';
import { HeaderComponent } from './components/header/header.component';
import { InputFullComponent } from './components/input-full/input-full.component';
import { LinkComponent } from './components/link/link.component';

const MODULES = [
  CommonModule,
  FormsModule,
  IonicModule,
  ReactiveFormsModule
]

const COMPONENTS = [
  ArComponent,
  HeaderComponent,
  InputFullComponent,
  LinkComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MODULES
  ], exports: [
    ...MODULES,...COMPONENTS
  ]
})
export class SharedModule { }
