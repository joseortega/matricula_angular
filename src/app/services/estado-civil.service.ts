import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EstadoCivil} from "../models/estadoCivil";

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<EstadoCivil[]>{
    return this.http.get<EstadoCivil[]>(`/estado-civil`);
  }
}
