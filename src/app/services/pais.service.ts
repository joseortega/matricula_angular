import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pais} from "../models/pais";
import {Representante} from "../models/representante";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Pais[]>{
    return this.http.get<Pais[]>(`/pais`);
  }

  getSearch(filter: string): Observable<Pais[]>{
    return this.http.get<Pais[]>(`/pais/search?filter=${filter}`);
  }
}
