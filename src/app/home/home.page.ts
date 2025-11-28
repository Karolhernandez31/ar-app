import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ArComponent } from '../shared/components/ar/ar.component';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  constructor(private routerOutlet: IonRouterOutlet, private modalController: ModalController) { }

  // company-store.page.ts

  async openAR() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ArComponent,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }
}
