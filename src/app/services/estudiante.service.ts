import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) {
  }

  getList(page: number, filter: string): Observable<any>{
    return this.http.get<any>(`/estudiante?filter=${filter}&page=${page}`);
  }

  create(estudiante: Estudiante): Observable<Estudiante>{
    return this.http.post<Estudiante>(`/estudiante/create`, estudiante);
  }

  update(id:number, estudiante: Estudiante): Observable<Estudiante>{
    return this.http.put<Estudiante>(`/estudiante/update/${id}`, estudiante);
  }

  getById(id: number): Observable<Estudiante>{
    return this.http.get<Estudiante>(`/estudiante/${id}`);
  }

  getSearch(filter: string): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`/estudiante/search?filter=${filter}`);
  }
}
