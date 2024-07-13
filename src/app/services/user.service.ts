import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5119/api/Users';

  constructor(private http: HttpClient) { }

  // Método para salvar um novo usuário
  saveUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
