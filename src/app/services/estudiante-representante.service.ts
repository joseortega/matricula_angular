import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { EstudianteRepresentante } from 'app/models/EstudianteRepresentante';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class EstudianteRepresentanteService {

private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('EstudianteRepresentanteService')
   }

   getList(estudianteId: number): Observable<EstudianteRepresentante[]>{
      return this.http.get<EstudianteRepresentante[]>(`${this.urlBase}/api/estudiante/${estudianteId}/representante`).pipe(
        catchError(this.handleError<any>('getList', []))
      );
   }

    getAlternativos(estudianteId: number): Observable<EstudianteRepresentante[]>{
       return this.http.get<EstudianteRepresentante[]>(`${this.urlBase}/api/estudiante/${estudianteId}/representante/alternativos`).pipe(
        catchError(this.handleError<any>('getList', []))
      );
    }

    getById(id: number): Observable<EstudianteRepresentante>{
      return this.http.get<EstudianteRepresentante>(`${this.urlBase}/api/estudiante-representante/${id}`).pipe(
        catchError(this.handleError<any>('getById', []))
      );
    }

    getPrincipal(estudianteId: number): Observable<EstudianteRepresentante>{
      return this.http.get<EstudianteRepresentante>(`${this.urlBase}/api/estudiante/${estudianteId}/representante/principal`);
    }

    create(estudianteId: number, estudianteRepresentante: EstudianteRepresentante): Observable<EstudianteRepresentante>{
        return this.http.post<EstudianteRepresentante>(`${this.urlBase}/api/estudiante/${estudianteId}/representante/create`, estudianteRepresentante)
            .pipe(
                catchError(this.handleError<any>('create', []))
      );
    }

    update(estudianteId: number, id: number, estudianteRepresentante: EstudianteRepresentante): Observable<EstudianteRepresentante>{
      return this.http.put<EstudianteRepresentante>(`${this.urlBase}/api/estudiante/${estudianteId}/representante/update/${id}`, estudianteRepresentante)
        .pipe(
            catchError(this.handleError<any>('update', []))
      );
    }

    delete(estudianteId: number, id: number): Observable<EstudianteRepresentante>{
        return this.http.delete<EstudianteRepresentante>(`${this.urlBase}/api/estudiante/${estudianteId}/representante/delete/${id}`).pipe(
        catchError(this.handleError<any>('delete', []))
        );
    }

    existePrincipal(estudianteId: number):Observable<boolean>{
      return this.http.get<boolean>(`${this.urlBase}/api/estudiante/${estudianteId}/representante/existe-principal`);
    }
}
