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
  iframeSrc?: SafeResourceUrl;
  permissionGranted = false;
  @Input() url: string = '';

  constructor(private modalController: ModalController, private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    await this.requestCameraPermission();
    this.buildIframeSrc();
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

  buildIframeSrc() {
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.buildUrl(this.url));
  }
  close() {
    this.modalController.dismiss();
  }

  private buildUrl(src: any): string {
    const params = new URLSearchParams({
      src: this.url,
    });
    return `/assets/aframe-ar.html?${params.toString()}`;
  }
}
