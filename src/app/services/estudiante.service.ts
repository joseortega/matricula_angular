import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable, catchError, throwError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Estudiante } from '../models/estudiante';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

     private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler,  private toastrService: ToastrService) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('EstudianteService')
   }

   getList(page: number, filter: string): Observable<any>{
        return this.http.get<any>(`${this.urlBase}/api/estudiante?filter=${filter}&page=${page}`)
            .pipe(
                catchError(this.handleError<any>('getList', []))
      );
    }

    create(estudiante: Estudiante): Observable<Estudiante>{
        return this.http.post<Estudiante>(`${this.urlBase}/api/estudiante/create`, estudiante);
    }

    update(id:number, estudiante: Estudiante): Observable<Estudiante>{
      return this.http.put<Estudiante>(`${this.urlBase}/api/estudiante/update/${id}`, estudiante);
    }

    getById(id: number): Observable<Estudiante>{
        return this.http.get<Estudiante>(`${this.urlBase}/api/estudiante/${id}`);
    }

    getSearch(filter: string): Observable<Estudiante[]>{
        return this.http.get<Estudiante[]>(`${this.urlBase}/api/estudiante/search?filter=${filter}`);
    }
}
