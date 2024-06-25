import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
@Injectable({
  providedIn: 'root'
})

export class AddStudentComponent implements OnInit {
  addStudentForm = new FormGroup({
      user_id: new FormControl("", Validators.required),
      pass_word: new FormControl("", [Validators.required, Validators.min(1), Validators.max(20)]),
      confirm_password: new FormControl("", Validators.required)
  });

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

   ngOnInit(): void {
    console.log("Initializing Add Student Component!!");
  }

  addStudentService(): Observable<any> {
    // Define your authorization token
  
    // Define the headers with authorization
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('Token')}`,
        'Content-Type': 'application/json' // Assuming your content type is JSON
      })
    };
  
    // Make the HTTP POST request with the headers
    return this.http.post(`http://localhost:8080/api/addUser`, {
      user_id: this.addStudentForm.value['user_id'],
      pass_word: this.addStudentForm.value['pass_word']
    }, httpOptions);
  }
  
  addUser() {
    console.log("Form Values to be sent: ", this.addStudentForm.value);
    if(this.addStudentForm.value['confirm_password'] === this.addStudentForm.value['pass_word']){
    this.addStudentService().subscribe(
      (response:any) => {
        console.log("Response: ", response);
        alert(response.Status)
        this.addStudentForm.patchValue({
          user_id: '',
          pass_word: '',
          confirm_password: ''
        })

      },
      (error:any) => {
        console.error("Error adding Student: ", error);
      }
    )
  }else{
    alert("Passwords Do Not Match!!")
  }
  }


}
