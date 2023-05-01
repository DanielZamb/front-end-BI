import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterForm } from '../models/register.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(fb: FormBuilder, private apiService: ApiService, private authService: AuthService) {
    this.registerForm = fb.group({
        name: fb.control('', Validators.required),
        email: fb.control('', [Validators.required, Validators.email]),
        password: fb.control('', [Validators.required, Validators.minLength(6)]),
        userType: fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.registerForm.reset({name: 'type your full name here'});
    this.registerForm.reset({email: 'provide a valid email'});
    this.registerForm.reset({password: 'type your password'});
    this.registerForm.reset({userType: 'select your user type'});
  }

  onRegister(){
    if(this.registerForm.valid){
      const registerData: RegisterForm = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        type: this.registerForm.value.usertype,
      }

      this.apiService.registerUser(registerData).subscribe((result) => {
        this.authService.setUser(result);
        console.log("Registered",result);
      }); 
    }

  }
}
