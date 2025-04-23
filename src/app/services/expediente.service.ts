import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expediente } from "../models/expediente";

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  constructor(private http: HttpClient) {
  }

  getByEstudianteId(estudianteId: number): Observable<Expediente>{
    return this.http.get<Expediente>(`/estudiante/${estudianteId}/expediente`);
  }

  create(estudianteId:number, expediente: Expediente): Observable<Expediente>{
    return this.http.post<Expediente>(`/estudiante/${estudianteId}/expediente/create`, expediente);
  }

  update(estudianteId: number, expediente: Expediente): Observable<Expediente>{
    return this.http.put<Expediente>(`/estudiante/${estudianteId}/expediente/update`, expediente);
  }

  exists(estudianteId: number): Observable<boolean>{
    return this.http.get<boolean>(`/estudiante/${estudianteId}/expediente/verifica`);
  }

  withdraw(expedienteId: number): Observable<Expediente>{
    return this.http.get<Expediente>(`/expediente/withdraw/${expedienteId}`);
  }

  reentry(expedienteId: number): Observable<Expediente>{
    return this.http.get<Expediente>(`/expediente/reentry/${expedienteId}`);
  }

  withdrawPrint(expedienteId: number): Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'  // Asegúrate de que el backend responda con PDF
    });

    return this.http.get<Blob>(`/expediente/withdraw-print/${expedienteId}`, { headers, responseType: 'blob' as 'json' });
  }
}
