import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuarios',
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  nombre!: string;
  apellido!: string;
  email!: string;
  password!: string;
  selectedRole: string = '';
  availableRoles: string[] = [];

  users: any[] = [];
  editingUser: any | null = null;
  editedNombre!: string;
  editedApellido!: string;
  editedEmail!: string;
  editedPassword!: string;
  editedSelectedRole!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getRoles();
    this.getUsers();
  }

  getRoles(): void {
    this.authService.getRoles().subscribe({
      next: (roles) => {
        this.availableRoles = roles.map((role: { name: string; }) => role.name);
        if (this.availableRoles.length > 0) {
          this.selectedRole = this.availableRoles[0];
        }
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }

  getUsers(): void {
    this.authService.getUsers().subscribe({
      next: (users) => {
        this.users = users.map((user: any) => ({
          id: user.id,
          nombre: user.name.split(' ')[0] || '',
          apellido: user.name.split(' ').slice(1).join(' ') || '',
          email: user.email,
          rol: user.roles[0] ? user.roles[0].name : ''
        }));
        console.log('Usuarios obtenidos:', this.users);
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  onSubmit() {
    if (this.editingUser) {
      const userData = {
        name: `${this.editedNombre} ${this.editedApellido}`.trim(),
        email: this.editedEmail,
        password: this.editedPassword || null,
        role_name: this.editedSelectedRole
      };

      this.authService.updateUser(this.editingUser.id, userData).subscribe({
        next: (response) => {
          console.log('Usuario actualizado:', response);
          alert(`Usuario '${response.user.name}' actualizado.`);
          this.getUsers();
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          alert('Error al actualizar usuario: ' + (error.error.message || 'Verifica los datos.'));
        }
      });
    } else {
      const userData = {
        name: `${this.nombre} ${this.apellido}`.trim(),
        email: this.email,
        password: this.password,
        role_name: this.selectedRole
      };

      this.authService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          alert('Usuario registrado exitosamente!');
          this.clearForm();
          this.getUsers();
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          alert('Error al registrar usuario: ' + (error.error.message || 'Verifica los datos.'));
        }
      });
    }
  }

  editUser(user: any) {
    this.editingUser = { ...user };
    this.editedNombre = user.nombre;
    this.editedApellido = user.apellido;
    this.editedEmail = user.email;
    this.editedPassword = '';
    this.editedSelectedRole = user.rol;
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.authService.deleteUser(id).subscribe({
        next: (response) => {
          console.log('Usuario eliminado:', response);
          alert('Usuario eliminado.');
          this.getUsers();
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar usuario: ' + (error.error.message || 'Hubo un error al eliminar el usuario.'));
        }
      });
    }
  }

  cancelEdit() {
    this.editingUser = null;
    this.clearForm();
  }

  clearForm() {
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.password = '';
    this.editedNombre = '';
    this.editedApellido = '';
    this.editedEmail = '';
    this.editedPassword = '';
    this.editedSelectedRole = '';
  }
}
