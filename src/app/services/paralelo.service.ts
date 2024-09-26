import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Paralelo } from '../models/paralelo';

@Injectable({
  providedIn: 'root'
})
export class ParaleloService {

     private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('ParaleloService')
   }
   
   getList(): Observable<Paralelo[]>{
        return this.http.get<Paralelo[]>(`${this.urlBase}/api/paralelo`).pipe(
        catchError(this.handleError<any>('getList', []))
      );
    }
}
