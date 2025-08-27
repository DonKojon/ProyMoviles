import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit() {
    // Credenciales del usuario de prueba
    const testUserEmail = 'prueba';
    const testUserPassword = '12345678';

    // Verificar si es el usuario de prueba
    if (this.email === testUserEmail && this.password === testUserPassword) {
      console.log('Inicio de sesión exitoso con usuario de prueba.');
      // Simular un token y datos de usuario para el usuario de prueba
      localStorage.setItem('user_token', 'fake_token_for_test_user');
      localStorage.setItem('user_data', JSON.stringify({
        name: 'Usuario de Prueba',
        email: testUserEmail,
        roles: [{ name: 'administrador' }] // Simular que el usuario de prueba es un administrador
      }));
      this.router.navigate(['/dashboard']);
      return; // Detener la ejecución para no ir al backend
    }

    // Si no es el usuario de prueba, proceder con la autenticación normal al backend
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('user_token', response.token);
        localStorage.setItem('user_data', JSON.stringify(response.user));

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error de inicio de sesión:', error);
        alert('Error de inicio de sesión: ' + (error.error.message || 'Credenciales incorrectas.'));
      }
    });
  }
}
