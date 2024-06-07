import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { loginService } from './login.service';
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
  constructor(private fb: FormBuilder, private loginService: loginService) {}

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
    if(this.loginForm.valid) {
      this.loginService.login(username, password).subscribe(
        response => {
          // this.toastr.success('Login successful!', 'Success');
          // console.log("passing....")
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
      console.log(this.loginForm.valid)
    } else {
      ValidateForm.validateAllFormsFields(this.loginForm);
      alert('Your form is invalid!')
    }
  }
  
}