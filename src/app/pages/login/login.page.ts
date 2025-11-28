import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  isLoading = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private loaderService: LoadingService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;

    try {
      await this.loaderService.show('Iniciando sesión...');
      await this.authService.login(email, password);
      await this.router.navigate(['/home']).then(() => {
        this.loaderService.hide();
        this.loginForm.reset();
      });
    } catch (error: any) {
      this.loaderService.hide().then(
        () => this.toastService.show('Un error ocurrió durante el inicio de sesión.')
      );
      console.error('Login error:', error);
    }
  }

}
