import { Component, OnInit } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {}

  async ngOnInit() {
    // Esperar a que la plataforma esté lista
    // await this.platform.ready();
    // console.log('Checking permissions...');
    // await this.checkPermissions();
  }

  async checkPermissions() {
    try {
      console.log('Checking permissions...');

      const result = await FilePicker.checkPermissions();
      console.log('Current permissions:', result);

      if (result.accessMediaLocation === 'denied' || result.readExternalStorage === 'denied') {
        console.log('Solicitando permisos...');

        const resultp = await FilePicker.requestPermissions();
        console.log('Permission request result:', resultp);

        if (resultp.accessMediaLocation === 'denied' || resultp.readExternalStorage === 'denied') {
          console.warn('Permisos denegados para acceder a los archivos.');
          // Aquí podrías mostrar un alert al usuario
        } else {
          console.log('Permisos concedidos');
        }
      } else {
        console.log('Permisos ya concedidos');
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  }
}
