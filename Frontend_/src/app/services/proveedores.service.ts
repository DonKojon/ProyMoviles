import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

export interface Proveedor {
  id?: number;
  name: string;
  company: string;
  delivery_dates?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.getUrl('suppliers'));
  }

  agregarProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.getUrl('suppliers'), proveedor);
  }

  eliminarProveedor(id: number): Observable<any> {
    return this.http.delete(this.getUrl(`suppliers/${id}`));
  }
} 