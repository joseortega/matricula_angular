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
import {MatriculaDashboardComponent} from "./routes/matricula/matricula-dashboard/matricula-dashboard.component";
import {ExpedienteWithdrawalComponent} from "./routes/expediente/expediente-withdrawal/expediente-withdrawal.component";

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'matricula', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'matricula', component: MatriculaListComponent },
      { path: 'matricula/dashboard/new', component: MatriculaDashboardComponent },
      { path: 'matricula/dashboard/edit/:id', component: MatriculaDashboardComponent },
      { path: 'expediente/retiro', component: ExpedienteWithdrawalComponent },
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
 // { path: '**', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'auth/login' },
];
