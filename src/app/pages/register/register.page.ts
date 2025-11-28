import { ToastService } from './../../core/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private loaderService: LoadingService,
    private toastService: ToastService
  ) {
    this.registerForm = this.createForm();
  }

  ngOnInit() {}

  createForm(): FormGroup {
    return this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  async onRegister() {
    const { email, password, name, lastname } = this.registerForm.value;

    try {
      await this.loaderService.show('Registrando usuario...');
      const userAuth = await this.authService.register(email, password);
      const uid = userAuth.uid;

      await this.userService.create({uid, name, lastname, email});
      await this.loaderService.hide()
      this.toastService.show('Usuario registrado').then(
        () => {
          this.registerForm.reset()
          this.authService.logout()
        }
      )
    } catch (error: any) {
      await this.toastService.show('Error al registrar el usuario');
      await this.loaderService.hide()
      console.error(error);
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
