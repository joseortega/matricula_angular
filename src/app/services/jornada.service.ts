import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jornada } from '../models/jornada';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Jornada[]>{
    return this.http.get<Jornada[]>(`/jornada`);
  }
}
