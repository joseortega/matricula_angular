import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import {Expediente} from "../models/expediente";

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

  getById(id: number): Observable<Expediente>{
    return this.http.get<Expediente>(`${this.urlBase}/api/expediente/${id}`).pipe(
      catchError(this.handleError<any>('getById', []))
    );
  }
}
