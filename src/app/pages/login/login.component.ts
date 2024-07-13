import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLargerComponent } from '../../components/spinner-larger/spinner-larger.component';
import { SpinnerSmallComponent } from '../../components/spinner-small/spinner-small.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AuthService } from '../../services/auth.service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    SpinnerLargerComponent, 
    SpinnerSmallComponent,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  isLoadingEnter: boolean = false;
  isLoadingGoogle: boolean = false;
  isLoadingApple: boolean = false;
  isLoadingMicrosoft: boolean = false;

  email: string = '';
  password: string = '';

  validationError: any = {};

  constructor(private router: Router, private authService: AuthService) { }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  onLoginEnter(): void {

      this.isLoadingEnter = true;
      this.authService.login(this.email, this.password).subscribe(
        response => {
          this.authService.setToken(response.token);
          this.isLoadingEnter = false;
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed', error);
          this.isLoadingEnter = false;
          this.validationError = {unauthorized: 'Nao autorizado'}
        }
      );
  }

  onLoginGoogle(): void {
    this.isLoadingGoogle = !this.isLoadingGoogle
  }

  onLoginApple(): void {
    this.isLoadingApple = !this.isLoadingApple
  }

  onLoginMicrosoft() : void {
    this.isLoadingMicrosoft = !this.isLoadingMicrosoft
  }

}
