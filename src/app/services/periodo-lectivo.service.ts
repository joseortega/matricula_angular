import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { PeriodoLectivo } from '../models/periodo-lectivo';

@Injectable({
  providedIn: 'root'
})
export class PeriodoLectivoService {

     private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('PeriodoLectivoService')
   }

   getList(): Observable<PeriodoLectivo[]>{
        return this.http.get<PeriodoLectivo[]>(`${this.urlBase}/api/periodo-lectivo`).pipe(
        catchError(this.handleError<any>('getList', []))
      );
    }
}
