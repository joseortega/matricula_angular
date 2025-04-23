import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Nacionalidad } from '../models/nacionalidad';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Nacionalidad[]>{
    return this.http.get<Nacionalidad[]>(`/nacionalidad`);
  }
}
