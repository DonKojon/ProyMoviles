import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-roles',
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  roleName!: string;
  roles: { id: number, name: string }[] = [];
  editingRole: { id: number, name: string } | null = null;
  editedRoleName!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.authService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        console.log('Roles obtenidos:', this.roles);
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }

  onSubmit() {
    if (this.editingRole) {
      this.authService.updateRole(this.editingRole.id, { name: this.editedRoleName }).subscribe({
        next: (response) => {
          console.log('Rol actualizado:', response);
          alert(`Rol '${this.editedRoleName}' actualizado.`);
          this.getRoles();
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error al actualizar rol:', error);
          alert('Error al actualizar rol: ' + (error.error.message || 'Verifica los datos.'));
        }
      });
    } else {
      this.authService.createRole({ name: this.roleName }).subscribe({
        next: (response) => {
          console.log('Nuevo Rol creado:', response);
          alert(`Rol '${this.roleName}' creado exitosamente.`);
          this.getRoles();
          this.roleName = '';
        },
        error: (error) => {
          console.error('Error al crear rol:', error);
          alert('Error al crear rol: ' + (error.error.message || 'Verifica los datos.'));
        }
      });
    }
  }

  editRole(role: { id: number, name: string }) {
    this.editingRole = { ...role };
    this.editedRoleName = role.name;
  }

  deleteRole(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este rol?')) {
      this.authService.deleteRole(id).subscribe({
        next: (response) => {
          console.log('Rol eliminado:', response);
          alert('Rol eliminado.');
          this.getRoles();
        },
        error: (error) => {
          console.error('Error al eliminar rol:', error);
          alert('Error al eliminar rol: ' + (error.error.message || 'Hubo un error al eliminar el rol.'));
        }
      });
    }
  }

  cancelEdit() {
    this.editingRole = null;
    this.editedRoleName = '';
    this.roleName = '';
  }
}
