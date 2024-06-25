import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  Total_Users : number = 0
  Total_Audits : number = 0
  My_Queries : number = 0

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    const Token = localStorage.getItem("Token")
    this.http.get('http://localhost:8080/api/getStats', {
      headers:{
        "Content-Type":"application/json",
        "Authorization": 'Bearer ' + Token
      }
    }).subscribe(
      (response:any) => {
        console.log("Stats: ", response)
        this.Total_Users = Number(response.users)
        this.Total_Audits = Number(response.audits)
        this.My_Queries = Number(response.my_queries)
      },
      error => {
        console.error("Something Went Wrong", error)
      }
    )
  }
}
