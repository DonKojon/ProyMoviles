import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  @Output() isCollapsedChange = new EventEmitter<boolean>();

  usuario: any = null;
  rol: string = '';
  esAdmin = false;
  esGerente = false;
  esEmpleado = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
      this.usuario = JSON.parse(userDataString);
      this.rol = this.usuario?.roles[0]?.name || '';
    }
    console.log('Rol del usuario en Navbar:', this.rol);

    this.esAdmin = this.rol === 'administrador';
    this.esGerente = this.rol === 'gerente';
    this.esEmpleado = this.rol === 'empleado';
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }

  navigateTo(path: string) {
    console.log(`Intentando navegar a: ${path}`);
    this.router.navigate([path]);
  }

  cerrarSesion() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Cierre de sesión exitoso:', response);
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión: ' + (error.error.message || 'Hubo un error.'));
      }
    });
  }
}
