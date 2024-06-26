import { Component, OnInit, Injectable, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
// import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-audit-logger',
  standalone: true,
  imports: [CommonModule, NgClass, NgFor, NgIf],
  templateUrl: './audit-logger.component.html',
  styleUrls: ['./audit-logger.component.css']
})
export class AuditLoggerComponent implements OnInit {

  auditDetails: any[] = [];
  filteredAuditDetails: any[] = [];
  selectedColumn: string = '';
  filterValue: string = '';
  @ViewChild('auditTable', { static: false }) userTable!: ElementRef;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem("Token");
    this.http.get('http://localhost:8080/api/getAudits', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + token
      }
    }).subscribe(
      (response: any) => {
        this.auditDetails = response;
        this.filteredAuditDetails = response;
      },
      error => {
        console.error("Something Went Wrong", error);
      }
    );
  }

  onFilterChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.id === 'filterDropdown') {
      this.selectedColumn = target.value;
    } else if (target.id === 'filterValue') {
      this.filterValue = target.value.toLowerCase();
    }
    this.filterTable();
  }

  filterTable() {
    if (!this.selectedColumn || !this.filterValue) {
      this.filteredAuditDetails = this.auditDetails; // Show all details if no filter is applied
    } else {
      this.filteredAuditDetails = this.auditDetails.filter(item => {
        const columnValue = item[this.selectedColumn]?.toString().toLowerCase();
        return columnValue.includes(this.filterValue);
      });
    }
  }
  exportTableElmToExcel(element: ElementRef, fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element.nativeElement);
    // generate workbook and add the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    // save to file
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }
  exportElmToExcel(): void {
    this.exportTableElmToExcel(this.userTable, 'user_data');
  }
}
