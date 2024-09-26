import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { Estudiante } from 'app/models/estudiante';
import { EstudianteSearchComponent } from 'app/routes/estudiante/estudiante-search/estudiante-search.component';
import { EstudianteShowComponent } from 'app/routes/estudiante/estudiante-show/estudiante-show.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EstudianteRepresentanteListComponent } from '../../estudiante-representante/estudiante-representante-list/estudiante-representante-list.component';
import { ExpedienteComponent} from "../../expediente/expediente.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatriculaFormComponent } from '../matricula-form/matricula-form.component';
import { Matricula } from 'app/models/matricula';
import { MatriculaService } from 'app/services/matricula.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatriculaShowComponent } from '../matricula-show/matricula-show.component';

@Component({
  selector: 'app-matricula-new',
  standalone: true,
  imports: [MatTabsModule,
    PageHeaderComponent,
    EstudianteShowComponent,
    EstudianteSearchComponent,
    EstudianteRepresentanteListComponent,
    ExpedienteComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatriculaFormComponent, MatriculaShowComponent,
  ],
  templateUrl: './matricula-new.component.html',
  styleUrl: './matricula-new.component.css'
})
export class MatriculaNewComponent implements OnInit {

    public matricula: Matricula = new Matricula();
    public isEditMode: boolean = false;

    constructor(private matriculaService: MatriculaService,
                private toastrService: ToastrService,
                private route: ActivatedRoute,
                private router: Router,
                public dialog: MatDialog){
    }

    ngOnInit(): void {
        const  matriculaId = Number(this.route.snapshot.paramMap.get('id'));
        //comprobamos matriculaId existe
        if(matriculaId){
                 this.getById(matriculaId);
        }
    }

    selectEstudiante(estudiante: Estudiante){
        this.matricula.estudiante = estudiante;
    }

    editMatricula(editMode: boolean): void{
        this.isEditMode = editMode;
    }

    onSubmitted(matricula: Matricula){
        this.matricula = matricula;
        if(!this.matricula.id){
            this.create();
        }else{
            this.update();
        }
    }

    create(): void{
        this.matriculaService.create(this.matricula).subscribe({
            next: data => {
                this.matricula = data;
                this.router.navigate([`matricula/edit/${this.matricula.id}`]);
                this.toastrService.success('El elemento fue creado correctamente!', 'Éxito!', {"closeButton": true});
                this.isEditMode = false;
            }
        });
    }
     update(): void{
        this.matriculaService.update(this.matricula.id, this.matricula).subscribe({
            next: data => {
                this.matricula = data;
                this.toastrService.success('El elemento fue actualizado correctamente!', 'Éxito!', {"closeButton": true});
                this.isEditMode = false;
            }
        });
    }

    getById(matriculaId: number): void{
        this.matriculaService.getById(matriculaId).subscribe({
            next: data => {
                this.matricula = data;
            }
        });
    }

    updateEstudiante(estudiante: Estudiante) {
        this.matricula.estudiante = estudiante;
    }

    pdf(): void{
      this.matriculaService.pdf(Number (this.matricula.id)).subscribe({
        next: data => {
          // Crear una URL para el Blob y forzar la descarga
          const url = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'document.pdf';  // Nombre del archivo PDF
          link.click();
        }
      });
    }
}
