import { Routes } from '@angular/router';
import { authGuard } from '@core';
import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { Error403Component } from './routes/sessions/403.component';
import { Error404Component } from './routes/sessions/404.component';
import { Error500Component } from './routes/sessions/500.component';
import { LoginComponent } from './routes/sessions/login/login.component';
import { RegisterComponent } from './routes/sessions/register/register.component';
import {MatriculaListComponent} from "./routes/matricula/matricula-list/matricula-list.component";
import {MatriculaNewComponent} from "./routes/matricula/matricula-new/matricula-new.component";
import {MatriculaDashboardComponent} from "./routes/matricula/matricula-dashboard/matricula-dashboard.component";

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'matricula', component: MatriculaListComponent },
      { path: 'matricula/dashboard/new', component: MatriculaDashboardComponent },
      { path: 'matricula/dashboard/edit/:id', component: MatriculaDashboardComponent },
      { path: 'matricula/new', component: MatriculaNewComponent },
      { path: 'matricula/edit/:id', component: MatriculaNewComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
