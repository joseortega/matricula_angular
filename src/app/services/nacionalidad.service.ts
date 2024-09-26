import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Nacionalidad } from '../models/nacionalidad';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadService {

     private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('NacionalidadService')
   }
   
   getList(): Observable<Nacionalidad[]>{
        return this.http.get<Nacionalidad[]>(`${this.urlBase}/api/nacionalidad`).pipe(
        catchError(this.handleError<any>('getList', []))
      );
    }
}
