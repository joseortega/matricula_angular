import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, catchError} from 'rxjs';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Estudiante } from '../models/estudiante';
import { Matricula } from '../models/matricula';
import { MatriculaFilter } from 'app/filters/matricula-filter';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

     private urlBase: string;
     private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
       this.urlBase= 'https://localhost:8000';
       this.handleError = httpErrorHandler.createHandleError('EstudianteService')
   }

   getList(pageIndex: number, pageSize: number, matriculaFilter: MatriculaFilter): Observable<any>{
        let params = new HttpParams();

         if (matriculaFilter.periodo_lectivo && matriculaFilter.periodo_lectivo.id !== undefined) {
             params = params.append('periodo_lectivo', matriculaFilter.periodo_lectivo.id.toString());
         }
         if (matriculaFilter.grado_escolar && matriculaFilter.grado_escolar.id !== undefined) {
             params = params.append('grado_escolar', matriculaFilter.grado_escolar.id.toString());
         }
         if (matriculaFilter.search_term) {
             params = params.append('search_term', matriculaFilter.search_term);
         }

        params = params.append('page', pageIndex);
        params = params.append('page_size', pageSize);

        return this.http.get<any>(`${this.urlBase}/api/matricula`, { params });
    }

    create(matricula: Matricula): Observable<Matricula>{
        return this.http.post<Matricula>(`${this.urlBase}/api/matricula/create`, matricula);
    }

    update(id: any, matricula: Matricula): Observable<Matricula>{
      return this.http.put<Matricula>(`${this.urlBase}/api/matricula/update/${id}`, matricula);
    }

    getById(id: number): Observable<Matricula>{
        return this.http.get<Matricula>(`${this.urlBase}/api/matricula/${id}`);
    }

    pdf(id: number): Observable<Blob>{

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'  // Asegúrate de que el backend responda con PDF
      });

      return this.http.get<Blob>(`${this.urlBase}/api/matricula/pdf/${id}`, { headers, responseType: 'blob' as 'json' });
    }
}
