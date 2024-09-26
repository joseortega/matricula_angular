import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Jornada } from '../models/jornada';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

     private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('JornandaService')
   }
   
   getList(): Observable<Jornada[]>{
        return this.http.get<Jornada[]>(`${this.urlBase}/api/jornada`).pipe(
        catchError(this.handleError<any>('getList', []))
      );
    }
}
