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

@Component({
  selector: 'app-matricula-list',
  standalone: true,
  imports: [CommonModule,
                    FormsModule,
                     RouterOutlet,
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
                     MatIconModule
                     ],
  templateUrl: './matricula-list.component.html',
  styleUrl: './matricula-list.component.css'
})
export class MatriculaListComponent implements OnInit, AfterViewInit  {
    public pageIndex: number = 0;
    public collectionLength: number = 0;
    public pageSize: number = 10;
    public pageSizeOptions: number[] = [5, 10, 25, 50];
    public filtertext: string = '';
    public matriculas: Matricula[] = [];

    //filters
    matriculaFilter: MatriculaFilter = {grado_escolar: new GradoEscolar(),periodo_lectivo: new PeriodoLectivo(), search_term: ''};
    matriculaFilterForm = new FormGroup({
        periodo_lectivo: new FormControl<PeriodoLectivo>(new PeriodoLectivo()),
        grado_escolar: new FormControl<GradoEscolar>(new GradoEscolar()),
        search_term: new FormControl('')
    });


    public periodoLectivoList$: Observable<PeriodoLectivo[]>=new Observable<PeriodoLectivo[]>;
    public gradoEscolarList$: Observable<GradoEscolar[]>=new Observable<GradoEscolar[]>;

    public dataSource = new MatTableDataSource<Matricula>();
    @ViewChild(MatPaginator) private paginator!: MatPaginator;

    displayedColumns: string[] = ['periodo_lectivo', 'identificacion', 'nombres', 'apellidos', "grado_escolar"];

    constructor(private matriculaService: MatriculaService,
                           private periodoLectivoService: PeriodoLectivoService,
                           private gradoEscolarService: GradoEscolarService,
                           private route: ActivatedRoute,
                           private router: Router){
    }

    ngOnInit(): void {
        //filters
        this.gradoEscolarList$ = this.gradoEscolarService.getList();
        this.periodoLectivoList$ = this.periodoLectivoService.getList();

        //matricula list
        this.getMatriculaList();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
  }

    handlePageEvent(pageEvent: PageEvent) {
        this.pageSize = pageEvent.pageSize;
        this.pageIndex = pageEvent.pageIndex;
        //matricula list
        this.getMatriculaList();
  }

    selectMatricula(matricula: Matricula){
        const matriculaId = matricula ? matricula.id : null;
        this.router.navigate(['/matricula/dashboard/edit', matriculaId]);
    }

    getMatriculaList(): void {
        this.matriculaService.getList(this.pageIndex +1, this.pageSize, this.matriculaFilter).subscribe({
            next: data => {
               this.matriculas = data.items;
               this.dataSource = new MatTableDataSource<Matricula>(this.matriculas);
                this.collectionLength = data.count;
            }
        });
    }

    search():void{
        this.getMatriculaList();
    }

    submit(){
        // Obtener los valores del formulario
        const formValues = this.matriculaFilterForm.value;

        // Asignar los valores a la interfaz MatriculaFilter
        this.matriculaFilter = {
            periodo_lectivo: formValues.periodo_lectivo,
            grado_escolar: formValues.grado_escolar,
            search_term: formValues.search_term
        };

        //actualizamos la lista de matricula con los filters
        this.getMatriculaList();
    }

    compareObjects(option1: any, option2: any): boolean {
        return option1 && option2 && option1.id === option2.id;
    }
}
