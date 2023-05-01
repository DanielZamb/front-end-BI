import { Component } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(fb: FormBuilder) {
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

  onRegister():void{

  }
}
