import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {EstadoMatricula} from "../models/estadoMatricula";

@Injectable({
  providedIn: 'root'
})
export class EstadoMatriculaService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<EstadoMatricula[]>{
    return this.http.get<EstadoMatricula[]>(`/estado-matricula`);
  }
}
