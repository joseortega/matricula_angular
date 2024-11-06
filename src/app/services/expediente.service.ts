import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import {Expediente} from "../models/expediente";
import {Representante} from "../models/representante";

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  private urlBase: string;
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.urlBase= 'https://localhost:8000';
    this.handleError = httpErrorHandler.createHandleError('ExpedienteService')
  }

  getByEstudianteId(estudianteId: number): Observable<Expediente>{
    return this.http.get<Expediente>(`${this.urlBase}/api/estudiante/${estudianteId}/expediente`);
  }

  create(estudianteId:number, expediente: Expediente): Observable<Expediente>{
    return this.http.post<Expediente>(`${this.urlBase}/api/estudiante/${estudianteId}/expediente/create`, expediente)
      .pipe(
        catchError(this.handleError<any>('create', []))
      );
  }

  update(estudianteId: number, expediente: Expediente): Observable<Expediente>{
    return this.http.put<Expediente>(`${this.urlBase}/api/estudiante/${estudianteId}/expediente/update`, expediente)
      .pipe(
        catchError(this.handleError<any>('update', []))
      );
  }
}
