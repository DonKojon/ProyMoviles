import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.getUrl('register'), userData);
  }

  getRoles(): Observable<any> {
    return this.http.get(this.getUrl('roles'));
  }

  createRole(roleData: { name: string }): Observable<any> {
    return this.http.post(this.getUrl('roles'), roleData);
  }

  updateRole(roleId: number, roleData: { name: string }): Observable<any> {
    return this.http.put(this.getUrl(`roles/${roleId}`), roleData);
  }

  deleteRole(roleId: number): Observable<any> {
    return this.http.delete(this.getUrl(`roles/${roleId}`));
  }

  getUsers(): Observable<any> {
    return this.http.get(this.getUrl('users'));
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put(this.getUrl(`users/${userId}`), userData);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(this.getUrl(`users/${userId}`));
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(this.getUrl('login'), credentials);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('user_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post(this.getUrl('logout'), {}, { headers });
  }
}
