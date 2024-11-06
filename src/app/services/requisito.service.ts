import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Requisito } from '../models/requisito';
import {Paralelo} from "../models/paralelo";

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {

  private urlBase: string;
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.urlBase= 'https://localhost:8000';
    this.handleError = httpErrorHandler.createHandleError('RequisitoService')
  }

  getList(): Observable<Requisito[]>{
    return this.http.get<Requisito[]>(`${this.urlBase}/api/requisito`).pipe(
      catchError(this.handleError<any>('getList', []))
    );
  }
}
