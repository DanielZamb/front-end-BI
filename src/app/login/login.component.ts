import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
        email: fb.control('', [Validators.required, Validators.email]),
        password: fb.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
    this.loginForm.reset({email: 'provide a valid email'});
    this.loginForm.reset({password: 'type your password'});
  }

  onLogin():void{

  }

}
