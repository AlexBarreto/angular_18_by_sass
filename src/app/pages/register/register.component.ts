import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLargerComponent } from '../../components/spinner-larger/spinner-larger.component';
import { SpinnerSmallComponent } from '../../components/spinner-small/spinner-small.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';


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
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {

  isLoadingRegister: boolean = false;
  isLoadingGoogle: boolean = false;
  isLoadingApple: boolean = false;
  isLoadingMicrosoft: boolean = false;

  name: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  passwordRepeat: string = ''

  validationErrors: any = {};

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  navigateToLogin() {
    this.router.navigate(['/']);
  }

  onRegisterClickEnter(): void {
      this.isLoadingRegister = !this.isLoadingRegister;
  }

  onRegisterClickGoogle(): void {
    this.isLoadingGoogle = !this.isLoadingGoogle
  }

  onRegisterClickApple(): void {
    this.isLoadingApple = !this.isLoadingApple
  }

  onRegisterClickMicrosoft() : void {
    this.isLoadingMicrosoft = !this.isLoadingMicrosoft
  }

  saveUser(): void {

    const newUser = {
      name: this.name,
      telefone: this.phone,
      email: this.email,
      senha: this.password,
      repetirSenha: this.passwordRepeat
    };

    this.isLoadingRegister = true;
  
    this.userService.saveUser(newUser).subscribe(

      response => {

        console.log('Usuário salvo com sucesso!', response);

        this.authService.login(this.email, this.password).subscribe(
          response => {
            this.authService.setToken(response.token);
            this.isLoadingRegister = false;
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Login failed', error);
            this.isLoadingRegister = false;
          }
        );
      },
      error => {
        console.error('Erro ao salvar usuário:', error);
        this.validationErrors = error.error.errors || {};
        this.isLoadingRegister = false;
      }
    );
  }

}
