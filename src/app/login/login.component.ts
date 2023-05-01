import { AuthService } from './../services/auth.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginForm } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(fb: FormBuilder, private apiService: ApiService, private authService: AuthService) {
    this.loginForm = fb.group({
        email: fb.control('', [Validators.required, Validators.email]),
        password: fb.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
    this.loginForm.reset({email: 'provide a valid email'});
    this.loginForm.reset({password: 'type your password'});
  }

  onLogin() {
      if (this.loginForm.valid) {
        const credentials: LoginForm = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        };
    
        this.apiService.loginUser(credentials).subscribe((result) => {
          this.authService.setUser(result)
          console.log("Logged In:", result);
        });
      }
    }
}
  
