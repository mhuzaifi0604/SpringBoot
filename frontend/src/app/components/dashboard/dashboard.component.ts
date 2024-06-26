import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ApexChart, ApexNonAxisChartSeries, NgApexchartsModule, ApexPlotOptions, ApexDataLabels, ApexFill, ApexStroke } from 'ng-apexcharts';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgApexchartsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Total_Users: number = 0;
  Total_Audits: number = 0;
  My_Queries: number = 0;
  chartseries: ApexNonAxisChartSeries = [];
  chartLabels: string[] = ['Total Users', 'Total Audits', 'My Queries'];
  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  };
  chartPlotOptions: ApexPlotOptions = {
    pie: {
      expandOnClick: true
    }
  };
  chartDataLabels: ApexDataLabels = {
    enabled: true
  };
  chartFill: ApexFill = {
    type: 'gradient'
  };
  chartStroke: ApexStroke = {
    show: true,
    width: 2,
    colors: ['#fff']
  };

  changePasswordForm = new FormGroup({
    old_pass_word: new FormControl("", [Validators.required, Validators.min(1), Validators.max(20)]),
    new_pass_word: new FormControl("", [Validators.required,Validators.min(1), Validators.max(20)])
});
type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    const Token = localStorage.getItem("Token");
    this.http.get('http://localhost:8080/api/getStats', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + Token
      }
    }).subscribe(
      (response: any) => {
        console.log("Stats: ", response);
        this.Total_Users = Number(response.users);
        this.Total_Audits = Number(response.audits);
        this.My_Queries = Number(response.my_queries);
        
        // Update the chart series with the fetched data
        this.chartseries = [this.Total_Users, this.Total_Audits, this.My_Queries];
      },
      error => {
        console.error("Something Went Wrong", error);
      }
    );
  }
  
  change_password_Service(): Observable<any> {
    // Define your authorization token
  
    // Define the headers with authorization
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('Token')}`,
        'Content-Type': 'application/json' // Assuming your content type is JSON
      })
    };
  
    // Make the HTTP POST request with the headers
    return this.http.put(`http://localhost:8080/api/changePassword`, {
      old: this.changePasswordForm.value['old_pass_word'],
      new: this.changePasswordForm.value['new_pass_word']
    }, httpOptions);
  }
  change_Password(){
    this.change_password_Service().subscribe(
      (res:any) =>{
        console.log("Response: ", res)
        alert(res.Status)
        this.changePasswordForm.patchValue({
          old_pass_word: '',
          new_pass_word: ''
        })
      },
      (erro: any)=>{
        console.error("Something Went Wrong While Changing Password: ", erro);
        alert("Could Not Update Password!!")
      }
        )     
}
}
