import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudianteRepresentante } from 'app/models/EstudianteRepresentante';

@Injectable({
  providedIn: 'root'
})

export class EstudianteRepresentanteService {

  constructor(private http: HttpClient) {
   }

   getList(estudianteId: number): Observable<EstudianteRepresentante[]>{
      return this.http.get<EstudianteRepresentante[]>(`/estudiante/${estudianteId}/representante`);
   }

    getAlternativos(estudianteId: number): Observable<EstudianteRepresentante[]>{
       return this.http.get<EstudianteRepresentante[]>(`/estudiante/${estudianteId}/representante/alternativos`);
    }

    getById(id: number): Observable<EstudianteRepresentante>{
      return this.http.get<EstudianteRepresentante>(`/estudiante-representante/${id}`);
    }

    getPrincipal(estudianteId: number): Observable<EstudianteRepresentante>{
      return this.http.get<EstudianteRepresentante>(`/estudiante/${estudianteId}/representante/principal`);
    }

    create(estudianteId: number, estudianteRepresentante: EstudianteRepresentante): Observable<EstudianteRepresentante>{
        return this.http.post<EstudianteRepresentante>(`/estudiante/${estudianteId}/representante/create`, estudianteRepresentante);
    }

    update(estudianteId: number, id: number, estudianteRepresentante: EstudianteRepresentante): Observable<EstudianteRepresentante>{
      return this.http.put<EstudianteRepresentante>(`/estudiante/${estudianteId}/representante/update/${id}`, estudianteRepresentante);
    }

    delete(estudianteId: number, id: number): Observable<EstudianteRepresentante>{
      return this.http.delete<EstudianteRepresentante>(`/estudiante/${estudianteId}/representante/delete/${id}`);
    }

    existePrincipal(estudianteId: number):Observable<boolean>{
      return this.http.get<boolean>(`/estudiante/${estudianteId}/representante/existe-principal`);
    }
}
