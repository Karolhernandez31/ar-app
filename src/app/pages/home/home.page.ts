import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { FilePickerService } from 'src/app/core/services/file-picker.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SupabaseService } from 'src/app/core/services/supabase.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ArFormComponent } from 'src/app/shared/components/ar-form/ar-form.component';
import { ArComponent } from 'src/app/shared/components/ar/ar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  pictures: any[] = [];
  selectedPic: string = '';

  constructor(private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private pickSrv: FilePickerService,
    private upSrv: SupabaseService,
    private toastSrv: ToastService,
    private loadingSrv: LoadingService,
    private authSrv: AuthService) { }

  ngOnInit(): void {
    this.loadPictures();
  }

  async loadPictures() {
    await this.loadingSrv.show('Cargando imagenes...');
    const uid = await this.authSrv.getUserUid();
    this.upSrv.getAll(uid).subscribe((data) => {
      this.pictures = data;
      this.loadingSrv.hide();
    });
  }

  async pick() {
    const modal = await this.modalController.create({
      component: ArFormComponent
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      const uid = await this.authSrv.getUserUid();
      const file = await this.pickSrv.pickFile();
      data.uid = uid;
      console.log('Form Data:', data);
      if (!file) {
        this.toastSrv.show('No file selected');
        return;
      }
      console.log('Selected file1:', file);
      await this.loadingSrv.show('Subiendo image...');
      const fileName = `image-${Date.now()}`;
      data.name = file.name || fileName;
      const blob = file?.blob || new Blob();
      console.log('Blob to upload1:', blob.size);
      this.upSrv.upload(blob, fileName).then((url) => {
        this.upSrv.save(data, url);
        this.loadingSrv.hide();
        this.toastSrv.show('Image uploaded successfully');
      });
    }
  }

  async openAR() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ArComponent,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        url: this.selectedPic,
      }
    });

    return await modal.present();
  }

  isSelected(url: any): boolean {
    return this.selectedPic === url;
  }

  selectPicture(url: any) {
    if (this.isSelected(url)) {
      this.selectedPic = '';
    } else {
      this.selectedPic = url;
    }
    console.log('Selected picture URL:', this.selectedPic);
  }

  async deletePic(id: any){
    const uid = await this.authSrv.getUserUid();
    console.log('UID for deletion:', uid);
    this.upSrv.delete(uid, id);
    console.log('Picture to delete:', id);
    console.log('Delete function called');
  }
}
