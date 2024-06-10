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
      student: new FormControl("", Validators.required),
      class: new FormControl("", [Validators.required, Validators.min(1), Validators.max(20)]),
      grade: new FormControl("", [Validators.required, Validators.min(1), Validators.max(2),
    ])
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
    return this.http.post(`http://localhost:8080/AddStudent`, this.addStudentForm.value, httpOptions);
  }
  
  add_student() {
    console.log("Form Values to be sent: ", this.addStudentForm.value);
    this.addStudentService().subscribe(
      (response:any) => {
        console.log("Response: ", response);
        this.addStudentForm.patchValue({
          student: '',
          class: '',
          grade: ''
        })
      },
      (error:any) => {
        console.error("Error adding Student: ", error);
      }
    )
  }


}
