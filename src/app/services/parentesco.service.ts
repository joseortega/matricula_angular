import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Parentesco } from '../models/parentesco';


@Injectable({
  providedIn: 'root'
})
export class ParentescoService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Parentesco[]>{
    return this.http.get<Parentesco[]>(`/parentesco`);
  }
}
