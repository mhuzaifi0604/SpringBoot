import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loginService {
  private baseUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/Login`, {
      user_id: username, 
      pass_word: password
    });
  }
}