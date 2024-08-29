import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
  ) { }

  submitForm() {
    if (this.loginForm.invalid) {
      this.toastService.showError('Error', 'Please fill in all fields');
      return;
    }
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.access) {
          this.toastService.showSuccess('Success', 'Login successful');
        }
      },
      error: (error: any) => {
        console.error(error);
        this.toastService.showError('Error', 'Login failed');
      }
    });
  }

  navigateToRegister() {
    // navigate to register page
  }
}
