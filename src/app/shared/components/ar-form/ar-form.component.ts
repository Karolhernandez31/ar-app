import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ar-form',
  templateUrl: './ar-form.component.html',
  styleUrls: ['./ar-form.component.scss'],
  standalone: false,
})
export class ArFormComponent  implements OnInit {
  arConfig!: FormGroup;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit() {
     this.arConfig = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group(
      {
        mode: ['', Validators.required],
        preset: ['', Validators.required],
      },
    );
  }

  submit() {
    if (this.arConfig.valid) {
      this.modalCtrl.dismiss(this.arConfig.value);
    }
  }
}
