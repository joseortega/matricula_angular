import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UniformeTalla } from '../models/uniforme_talla';

@Injectable({
  providedIn: 'root'
})
export class UniformeTallaService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<UniformeTalla[]>{
    return this.http.get<UniformeTalla[]>(`/uniforme-talla`);
  }
}
