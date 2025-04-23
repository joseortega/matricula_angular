import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {map, tap} from 'rxjs';

import { Menu } from '@core';
import { Token, User } from './interface';
import {HttpErrorHandler} from "../../http-error-handler.service";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected readonly http = inject(HttpClient);

  login(username: string, password: string, rememberMe = false) {
    console.log(username, password);
    return this.http.post<Token>('/login_check', { username, password, rememberMe })
      .pipe(
        map(response => ({
          access_token: response.token,
        } as Token))
      );
    //return this.http.post<Token>('/auth/login', { username, password, rememberMe });
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.get<any>('/logout', {});
  }

  me() {
    return this.http.get<User>('/me');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
