import { Component } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ArComponent } from 'src/app/shared/components/ar/ar.component';

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
