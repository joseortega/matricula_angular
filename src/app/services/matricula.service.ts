import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matricula } from '../models/matricula';
import { MatriculaFilter } from 'app/filters/matricula-filter';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(private http: HttpClient) {

  }

  /**
   * Obtiene la lista paginada de matrículas aplicando los filtros especificados
   * @param pageIndex Número de página actual
   * @param pageSize Cantidad de registros por página
   * @param matriculaFilter Filtros a aplicar en la búsqueda
   * @returns Observable con los resultados paginados
   */
  getList(pageIndex: number, pageSize: number, matriculaFilter: MatriculaFilter): Observable<any> {
    let params = new HttpParams();
    params = this.paramsAppendFilter(matriculaFilter);

    params = params.append('page', pageIndex);
    params = params.append('page_size', pageSize);

    return this.http.get<any>(`/matricula`, {params});
  }

  /**
   * Crea una nueva matrícula en el sistema
   * @param matricula Datos de la matrícula a crear
   * @returns Observable con la matrícula creada
   */
  create(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(`/matricula/create`, matricula);
  }

  /**
   * Actualiza una matrícula existente
   * @param id ID de la matrícula a actualizar
   * @param matricula Nuevos datos de la matrícula
   * @returns Observable con la matrícula actualizada
   */
  update(id: any, matricula: Matricula): Observable<Matricula> {
    return this.http.put<Matricula>(`/matricula/update/${id}`, matricula);
  }

  /**
   * Obtiene una matrícula por su ID
   * @param id ID de la matrícula a buscar
   * @returns Observable con la matrícula encontrada
   */
  getById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(`/matricula/${id}`);
  }

  /**
   * Genera el PDF del certificado de matrícula
   * @param id ID de la matrícula
   * @returns Observable con el blob del PDF generado
   */
  pdfCertificadoMatricula(id: number): Observable<Blob> {
    const url = `/matricula/pdf-certificado-matricula/${id}`; // Usa backticks (`) para interpolación

    const headers = new HttpHeaders({
      Accept: 'application/pdf' // Asegura que el backend responda con PDF
    });

    return this.http.get(url, {
      headers, // Forma abreviada (object-shorthand)
      responseType: 'blob' // Tipo de respuesta como Blob
    });
  }

  pdfCertificadoMatriculaAsistencia(id: number): Observable<Blob> {

    const url = `/matricula/pdf-certificado-matricula-asistencia/${id}`;

    const headers = new HttpHeaders({
      Accept: 'application/pdf'  // Asegúrate de que el backend responda con PDF
    });

    return this.http.get(url, {
      headers, // Forma abreviada (object-shorthand)
      responseType: 'blob' // Tipo de respuesta como Blob
    });
  }

  pdfCertificadoPreinscripcion(id: number): Observable<Blob> {
    const url = `/matricula/pdf-certificado-preinscripcion/${id}`; // Usa backticks (`) para interpolación

    const headers = new HttpHeaders({
      Accept: 'application/pdf' // Asegura que el backend responda con PDF
    });

    return this.http.get(url, {
      headers, // Forma abreviada (object-shorthand)
      responseType: 'blob' // Tipo de respuesta como Blob
    });
  }

  pdfCartaAutorizacion(id: number): Observable<Blob> {

    const url = `/matricula/pdf-carta-autorizacion/${id}`;

    const headers = new HttpHeaders({
      Accept: 'application/pdf'  // Asegúrate de que el backend responda con PDF
    });

    return this.http.get(url, {
      headers, // Forma abreviada (object-shorthand)
      responseType: 'blob' // Tipo de respuesta como Blob
    });
  }

  pdfActaCompromiso(id: number): Observable<Blob> {
    const url = `/matricula/pdf-acta-compromiso/${id}`;

    const headers = new HttpHeaders({
      Accept: 'application/pdf'  // Asegúrate de que el backend responda con PDF
    });

    return this.http.get(url, {
      headers, // Forma abreviada (object-shorthand)
      responseType: 'blob' // Tipo de respuesta como Blob
    });
  }

  pdfMatriculaList(matriculaFilter: MatriculaFilter): Observable<Blob> {

    let params = new HttpParams();
    params = this.paramsAppendFilter(matriculaFilter);

    const url = `/pdf-matricula-list`;

    const headers = new HttpHeaders({
      Accept: 'application/pdf'  // Asegúrate de que el backend responda con PDF
    });

    return this.http.get(url, {
      headers, // Forma abreviada (object-shorthand)
      params,
      responseType: 'blob', // Tipo de respuesta como Blob
    });
  }

  excelMatriculaList(matriculaFilter: MatriculaFilter): Observable<Blob> {

    let params = new HttpParams();
    params = this.paramsAppendFilter(matriculaFilter);

    const url = `/excel-matricula-list`;

    return this.http.get(url, {
      params,
      responseType: 'blob',
    });
  }

  private paramsAppendFilter(matriculaFilter: MatriculaFilter): HttpParams{
    let params = new HttpParams();

    if (matriculaFilter.periodo_lectivo && matriculaFilter.periodo_lectivo.id !== undefined) {
      params = params.append('periodo_lectivo', matriculaFilter.periodo_lectivo.id.toString());
    }
    if (matriculaFilter.grado_escolar && matriculaFilter.grado_escolar.id !== undefined) {
      params = params.append('grado_escolar', matriculaFilter.grado_escolar.id.toString());
    }
    if (matriculaFilter.estado_matriculas && matriculaFilter.estado_matriculas.length > 0) {
      const ids = matriculaFilter.estado_matriculas.map(est => est.id).join(',');
      params = params.append('estado_matriculas', ids);
      // 👉 genera algo como estado_matriculas=1,2,3
    }
    if (matriculaFilter.paralelo && matriculaFilter.paralelo.id !== undefined) {
      params = params.append('paralelo', matriculaFilter.paralelo.id.toString());
    }
    if (matriculaFilter.search_term) {
      params = params.append('search_term', matriculaFilter.search_term);
    }

    return params;
  }
}
