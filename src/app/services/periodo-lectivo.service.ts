import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { PeriodoLectivo } from '../models/periodo-lectivo';

@Injectable({
  providedIn: 'root'
})
export class PeriodoLectivoService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<PeriodoLectivo[]>{
    return this.http.get<PeriodoLectivo[]>(`/periodo-lectivo`);
  }
}
