import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Camera } from '@capacitor/camera';

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

  permissionGranted = false;

  constructor(private modalController: ModalController) {}

  async ngOnInit() {
    await this.requestCameraPermission();
  }

  async requestCameraPermission() {
    try {
      const permission = await Camera.checkPermissions();

      if (permission.camera !== 'granted') {
        const request = await Camera.requestPermissions();
        this.permissionGranted = request.camera === 'granted';
      } else {
        this.permissionGranted = true;
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
