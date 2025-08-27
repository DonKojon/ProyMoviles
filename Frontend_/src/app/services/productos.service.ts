import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Proveedor } from './proveedores.service';

export interface Producto {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  supplier_id?: number;
  supplier?: Proveedor;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.getUrl('products'));
  }

  // Obtener un producto por ID
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.getUrl(`products/${id}`));
  }

  // Crear un nuevo producto
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.getUrl('products'), producto);
  }

  // Actualizar un producto existente
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.getUrl(`products/${id}`), producto);
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(this.getUrl(`products/${id}`));
  }
} 