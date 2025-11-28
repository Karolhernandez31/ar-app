import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  async show(message: string) {
    await Toast.show({
      text: message,
      duration: 'short',
      position: 'center',
    });
  }
}
