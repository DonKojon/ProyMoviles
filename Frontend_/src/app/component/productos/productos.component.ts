import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../../services/productos.service';
import { ProveedoresService, Proveedor } from '../../services/proveedores.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  proveedores: Proveedor[] = [];
  nuevoProducto: Producto = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    supplier_id: undefined
  };
  editandoProducto: Producto | null = null;
  modoEdicion = false;

  constructor(
    private productosService: ProductosService,
    private proveedoresService: ProveedoresService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.cargarProveedores();
  }

  ngOnDestroy() {
    // Limpieza de recursos si es necesaria
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  cargarProveedores() {
    this.proveedoresService.getProveedores().subscribe({
      next: (data) => { this.proveedores = data; },
      error: (err) => { console.error('Error al cargar proveedores:', err); }
    });
  }

  agregarProducto() {
    // Muestra en consola los datos que se van a enviar
    console.log('Datos a enviar:', this.nuevoProducto);
  
    this.productosService.crearProducto(this.nuevoProducto).subscribe({
      next: (response) => {
        console.log('Producto agregado:', response);
        this.cargarProductos();
        this.limpiarFormulario();
      },
      error: (error) => {
        console.error('Error al agregar producto:', error);
      }
    });
  }

  editarProducto(producto: Producto) {
    this.editandoProducto = { ...producto };
    if (producto.supplier_id) {
      this.editandoProducto.supplier_id = producto.supplier_id;
    } else if (producto.supplier && producto.supplier.id) {
      this.editandoProducto.supplier_id = producto.supplier.id;
    }
    this.modoEdicion = true;
  }

  actualizarProducto() {
    if (this.editandoProducto && this.editandoProducto.id) {
      this.productosService.actualizarProducto(this.editandoProducto.id, this.editandoProducto).subscribe({
        next: (response) => {
          console.log('Producto actualizado:', response);
          this.cargarProductos();
          this.cancelarEdicion();
        },
        error: (error) => {
          console.error('Error al actualizar producto:', error);
        }
      });
    }
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe({
        next: (response) => {
          console.log('Producto eliminado:', response);
          this.cargarProductos();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        }
      });
    }
  }

  cancelarEdicion() {
    this.editandoProducto = null;
    this.modoEdicion = false;
  }

  limpiarFormulario() {
    this.nuevoProducto = {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      supplier_id: undefined
    };
  }
}
