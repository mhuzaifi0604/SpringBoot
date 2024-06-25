import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-audit-logger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-logger.component.html',
  styleUrl: './audit-logger.component.css'
})
export class AuditLoggerComponent implements OnInit{

  auditDetails: any[] = [];
  constructor(private http:HttpClient){}

  ngOnInit(): void {
      const Token = localStorage.getItem("Token")
      this.http.get('http://localhost:8080/api/getAudits', {
        headers:{
          "Content-Type":"application/json",
          "Authorization": 'Bearer ' + Token
        }
      }).subscribe(
        (response:any) => {
          console.log("Audit Details: ", response)
          this.auditDetails = response
        },
        error => {
          console.error("Something Went Wrong", error)
        }
      )
  }

}
