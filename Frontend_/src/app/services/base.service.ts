import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl = 'http://192.168.1.4:8000/api';

  constructor(protected http: HttpClient) { }

  // Método helper para construir URLs
  protected getUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }
} 