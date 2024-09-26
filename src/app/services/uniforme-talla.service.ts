import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { UniformeTalla } from '../models/uniforme_talla';

@Injectable({
  providedIn: 'root'
})
export class UniformeTallaService {

  private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('UniformeTallaService')
   }
   
   getList(): Observable<UniformeTalla[]>{
        return this.http.get<UniformeTalla[]>(`${this.urlBase}/api/uniforme-talla`).pipe(
        catchError(this.handleError<any>('getList', []))
      );
    }
}
