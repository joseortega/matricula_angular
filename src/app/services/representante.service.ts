import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Representante } from '../models/representante';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

     private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('RepresentanteService')
   }

   getList(page: number, filter: string): Observable<Representante[]>{
        return this.http.get<Representante[]>(`${this.urlBase}/api/representante?filter=${filter}&page=${page}`)
            .pipe(
                catchError(this.handleError<any>('getList', []))
      );
    }

    create(representante: Representante): Observable<Representante>{
        return this.http.post<Representante>(`${this.urlBase}/api/representante/create`, representante)
            .pipe(
                catchError(this.handleError<any>('create', []))
      );
    }

    update(id: number, representante: Representante): Observable<Representante>{
      return this.http.put<Representante>(`${this.urlBase}/api/representante/update/${id}`, representante)
        .pipe(
            catchError(this.handleError<any>('update', []))
      );
    }

    getById(id: number): Observable<Representante>{
        return this.http.get<Representante>(`${this.urlBase}/api/representante/${id}`).pipe(
        catchError(this.handleError<any>('getById', []))
        );
    }


    getSearch(filter: string): Observable<Representante[]>{
        return this.http.get<Representante[]>(`${this.urlBase}/api/representante/search?filter=${filter}`);
    }
}
