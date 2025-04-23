import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paralelo } from '../models/paralelo';

@Injectable({
  providedIn: 'root'
})
export class ParaleloService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Paralelo[]>{
    return this.http.get<Paralelo[]>(`/paralelo`);
  }
}
