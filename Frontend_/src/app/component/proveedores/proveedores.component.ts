import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedoresService, Proveedor } from '../../services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {
  suppliers: Proveedor[] = [];
  nuevoProveedor: Proveedor = { name: '', company: '', delivery_dates: [] };

  constructor(private proveedoresService: ProveedoresService) { }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedoresService.getProveedores().subscribe({
      next: (data) => { this.suppliers = data; },
      error: (err) => { console.error('Error al cargar proveedores:', err); }
    });
  }

  agregarProveedor() {
    if (!this.nuevoProveedor.name || !this.nuevoProveedor.company) return;
    this.proveedoresService.agregarProveedor(this.nuevoProveedor).subscribe({
      next: () => {
        this.cargarProveedores();
        this.nuevoProveedor = { name: '', company: '', delivery_dates: [] };
      },
      error: (err) => { console.error('Error al agregar proveedor:', err); }
    });
  }

  eliminarProveedor(id: number) {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.proveedoresService.eliminarProveedor(id).subscribe({
        next: () => this.cargarProveedores(),
        error: (err) => { console.error('Error al eliminar proveedor:', err); }
      });
    }
  }
}
