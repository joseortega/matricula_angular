import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { GradoEscolar } from '../models/grado-escolar';

@Injectable({
  providedIn: 'root'
})
export class GradoEscolarService {

     private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('GradoEscolarService')
   }
   
   getList(): Observable<GradoEscolar[]>{
        return this.http.get<GradoEscolar[]>(`${this.urlBase}/api/grado-escolar`).pipe(
        catchError(this.handleError<any>('getList', []))
      );
    }
}
