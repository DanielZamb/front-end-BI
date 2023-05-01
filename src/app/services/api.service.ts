import { User } from '../models/user.model';
import { LoginForm } from './../models/login.model';
import { RegisterForm } from './../models/register.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiService {
    private readonly BACKEND_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerUser(registerForm: RegisterForm): Observable<User> {
    return this.http.post<User>(`${this.BACKEND_URL}/api/usuario`, registerForm);
  }

  loginUser(loginForm: LoginForm): Observable<User> {
    return this.http.post<User>(`${this.BACKEND_URL}/api/usuario`, loginForm);
  }

  submitReview(userId: number): Observable<any> {
    return this.http.post(`${this.BACKEND_URL}/api/resenias/usuario/`, { userId });
  }

  // Add more methods for fetching past reviews and model stats
}
