import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Matricula } from 'app/models/matricula';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatriculaService } from 'app/services/matricula.service';
import {MatButtonModule} from '@angular/material/button';
import { PageHeaderComponent } from '@shared';
import { PeriodoLectivoService } from 'app/services/periodo-lectivo.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { PeriodoLectivo } from 'app/models/periodo-lectivo';
import { GradoEscolarService } from 'app/services/grado-escolar.service';
import { GradoEscolar } from 'app/models/grado-escolar';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatriculaFilter } from 'app/filters/matricula-filter';
import { MatChipAvatar } from "@angular/material/chips";
import { Paralelo } from "../../../models/paralelo";
import { ParaleloService } from "../../../services/paralelo.service";
import { EstadoMatricula } from "../../../models/estadoMatricula";
import { EstadoMatriculaService } from "../../../services/estado-matricula.service";

@Component({
  selector: 'app-matricula-list',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterModule,
    PageHeaderComponent,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatPaginatorModule,
    AsyncPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule, MatChipAvatar,
  ],
  templateUrl: './matricula-list.component.html',
  styleUrl: './matricula-list.component.css'
})
export class MatriculaListComponent implements OnInit, AfterViewInit  {
    public pageIndex: number = 0;
    public collectionLength: number = 0;
    public pageSize: number = 10;
    public pageSizeOptions: number[] = [5, 10, 25, 50];
    public matriculas: Matricula[] = [];

    //filters
    matriculaFilter: MatriculaFilter = {grado_escolar: new GradoEscolar(),periodo_lectivo: new PeriodoLectivo(), paralelo: new Paralelo(), estado_matricula: new EstadoMatricula(), search_term: ''};
    matriculaFilterForm = new FormGroup({
        periodo_lectivo: new FormControl<PeriodoLectivo>(new PeriodoLectivo()),
        grado_escolar: new FormControl<GradoEscolar>(new GradoEscolar()),
        paralelo: new FormControl<Paralelo>(new Paralelo()),
        estado_matricula: new FormControl<EstadoMatricula>(new EstadoMatricula()),
        search_term: new FormControl('')
    });


    public periodoLectivoList$: Observable<PeriodoLectivo[]>=new Observable<PeriodoLectivo[]>;
    public gradoEscolarList$: Observable<GradoEscolar[]>=new Observable<GradoEscolar[]>;
    public paraleloList$: Observable<Paralelo[]>=new Observable<Paralelo[]>;
    public estado_matriculas$: Observable<EstadoMatricula[]> = new Observable<EstadoMatricula[]>();

    public dataSource = new MatTableDataSource<Matricula>();
    @ViewChild(MatPaginator) private paginator!: MatPaginator;

    displayedColumns: string[] = [
      'periodo_lectivo',
      'identificacion',
      'apellidos',
      'nombres',
      "grado_escolar",
      "estado",
      "inscrito_sistema_publico",
    ];

    constructor(private matriculaService: MatriculaService,
                 private periodoLectivoService: PeriodoLectivoService,
                 private gradoEscolarService: GradoEscolarService,
                 private paraleloService: ParaleloService,
                 private estadoMatriculaService: EstadoMatriculaService,
                 private route: ActivatedRoute,
                 private router: Router){
    }

    /**
     * Inicializa el componente cargando las listas necesarias para los filtros
     * y obteniendo la lista inicial de matrículas
     */
    ngOnInit(): void {
        //filters
        this.gradoEscolarList$ = this.gradoEscolarService.getList();
        this.periodoLectivoList$ = this.periodoLectivoService.getList();
        this.paraleloList$ = this.paraleloService.getList();
        this.estado_matriculas$ = this.estadoMatriculaService.getList();

        //matricula list
        this.getMatriculaList();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    /**
     * Maneja los eventos de paginación, actualizando el tamaño de página
     * y el índice actual para obtener los nuevos registros
     */
    handlePageEvent(pageEvent: PageEvent) {
        this.pageSize = pageEvent.pageSize;
        this.pageIndex = pageEvent.pageIndex;
        //matricula list
        this.getMatriculaList();
  }

    /**
     * Navega a la vista de edición de la matrícula seleccionada
     * @param matricula Objeto matrícula seleccionado
     */
    selectMatricula(matricula: Matricula){
        const matriculaId = matricula ? matricula.id : null;
        this.router.navigate(['/matricula/dashboard/edit', matriculaId]);
    }

    /**
     * Obtiene la lista de matrículas aplicando los filtros y paginación actuales
     */
    getMatriculaList(): void {
        this.matriculaService.getList(this.pageIndex +1, this.pageSize, this.matriculaFilter).subscribe({
            next: data => {
               this.matriculas = data.items;
               this.dataSource = new MatTableDataSource<Matricula>(this.matriculas);
               this.collectionLength = data.total_count;
            }
        });
    }

    search():void{
        this.getMatriculaList();
    }

    /**
     * Procesa el formulario de filtros, reinicia la paginación y actualiza la lista
     */
    submit(){
        // Obtener los valores del formulario
        const formValues = this.matriculaFilterForm.value;

        // Asignar los valores a la interfaz MatriculaFilter
        this.matriculaFilter = {
            periodo_lectivo: formValues.periodo_lectivo,
            grado_escolar: formValues.grado_escolar,
            paralelo: formValues.paralelo,
            estado_matricula: formValues.estado_matricula,
            search_term: formValues.search_term
        };
        //reseteamos la pagina a 0
        this.pageIndex = 0;

        //actualizamos la lista de matricula con los filters
        this.getMatriculaList();
    }

    pdfMatriculaList(){
      this.matriculaService.pdfMatriculaList(this.matriculaFilter).subscribe({
        next: data => {
          // Crear una URL para el Blob y forzar la descarga
          const url = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'matricula_list.pdf';  // Nombre del archivo PDF
          link.click();
        }
      });
    }

    /**
     * Compara dos objetos por su ID para el select de Material
     * @param option1 Primer objeto a comparar
     * @param option2 Segundo objeto a comparar
     * @returns boolean indicando si los objetos son iguales
     */
    compareObjects(option1: any, option2: any): boolean {
        return option1 && option2 && option1.id === option2.id;
    }
}
