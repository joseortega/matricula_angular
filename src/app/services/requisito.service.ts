import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Requisito } from '../models/requisito';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Requisito[]>{
    return this.http.get<Requisito[]>(`/requisito`);
  }
}
