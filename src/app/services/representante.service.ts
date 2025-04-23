import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Representante } from '../models/representante';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  constructor(private http: HttpClient) {
  }

  getList(page: number, filter: string): Observable<Representante[]>{
    return this.http.get<Representante[]>(`/representante?filter=${filter}&page=${page}`);
  }

  create(representante: Representante): Observable<Representante>{
    return this.http.post<Representante>(`/representante/create`, representante);
  }

  update(id: number, representante: Representante): Observable<Representante>{
    return this.http.put<Representante>(`/representante/update/${id}`, representante);
  }

  getById(id: number): Observable<Representante>{
    return this.http.get<Representante>(`/representante/${id}`);
  }

  getSearch(filter: string): Observable<Representante[]>{
    return this.http.get<Representante[]>(`/representante/search?filter=${filter}`);
  }
}
