import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { loginService } from './login.service';
import {Router} from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private loginService: loginService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    
    if (this.loginForm.valid) {
      this.loginService.login(username, password).subscribe(
        (response: any) => {
          console.log("Response: ", response);
  
          if (response.token === null && response.message === "No Such User Found!!") {
            // Login failed
            alert('Login failed. No such user found!');
          } else {
            // Login successful
            localStorage.setItem("Token", response.token);
            this.router.navigate(['../dashboard']);
          }
        },
        error => {
          console.error(error);
          // Handle error if necessary
        }
      );
    } else {
      // Form is invalid
      ValidateForm.validateAllFormsFields(this.loginForm);
      alert('Your form is invalid!')
    }
  }  
  
}