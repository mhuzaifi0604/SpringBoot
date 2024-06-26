import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {AddStudentComponent} from './components/add-student/add-student.component'
import { AuditLoggerComponent } from './components/audit-logger/audit-logger.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  // {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add-student', component: AddStudentComponent},
  {path: 'audit-logger', component: AuditLoggerComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }