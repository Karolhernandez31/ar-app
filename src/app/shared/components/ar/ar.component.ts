import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

// export interface ArConfig {
//   mode: 'marker' | 'image' | 'location';
//   src: string;
//   markerPreset?: 'hiro' | 'kanji' | 'custom';
//   patternUrl?: string;
//   width?: number;
//   height?: number;
//   type?: 'image' | 'model' | 'video';
// }

// export interface ArTarget extends ArConfig {
//   id: string;
//   title?: string;
// }

@Component({
  selector: 'app-ar-view',
  templateUrl: './ar.component.html',
  styleUrls: ['./ar.component.scss'],
  standalone: false
})
export class ArComponent {
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  close() {
    this.modalCtrl.dismiss();
  }
}
