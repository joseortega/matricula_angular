import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Modalidad } from '../models/modalidad';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

     private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('ModalidadService')
   }
   
   getList(): Observable<Modalidad[]>{
        return this.http.get<Modalidad[]>(`${this.urlBase}/api/modalidad`).pipe(
        catchError(this.handleError<any>('getList', []))
      );
    }
}
