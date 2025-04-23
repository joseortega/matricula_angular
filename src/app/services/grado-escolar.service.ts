import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';
import { GradoEscolar } from '../models/grado-escolar';

@Injectable({
  providedIn: 'root'
})
export class GradoEscolarService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<GradoEscolar[]>{
    return this.http.get<GradoEscolar[]>(`/grado-escolar`);
  }
}
