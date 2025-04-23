import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modalidad } from '../models/modalidad';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Modalidad[]>{
    return this.http.get<Modalidad[]>(`/modalidad`);
  }
}
