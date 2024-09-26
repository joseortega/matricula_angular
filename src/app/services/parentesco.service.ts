import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Parentesco } from '../models/parentesco';


@Injectable({
  providedIn: 'root'
})
export class ParentescoService {

    private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('ParentescoService')
   }
   
   getList(): Observable<Parentesco[]>{
        return this.http.get<Parentesco[]>(`${this.urlBase}/api/parentesco`).pipe(
        catchError(this.handleError<any>('getList', []))
      );
    }
}
