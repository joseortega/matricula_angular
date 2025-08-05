import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { Estudiante } from 'app/models/estudiante';
import { EstudianteSearchComponent } from 'app/routes/estudiante/estudiante-search/estudiante-search.component';
import { EstudianteShowComponent } from 'app/routes/estudiante/estudiante-show/estudiante-show.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EstudianteRepresentanteListComponent } from '../../estudiante-representante/estudiante-representante-list/estudiante-representante-list.component';
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
import { EstudianteRepresentantePrincipalComponent } from "../../estudiante-representante/estudiante-representante-principal/estudiante-representante-principal.component";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDivider} from "@angular/material/divider";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-matricula-new',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatriculaFormComponent,
    MatriculaShowComponent,
    MatExpansionModule,
  ],
  templateUrl: './matricula-new.component.html',
  styleUrl: './matricula-new.component.css'
})
export class MatriculaNewComponent implements OnInit {
  @Input() matricula: Matricula = new Matricula();
  @Output() matriculaChangueEvent = new EventEmitter<Matricula>();
  public isEditMode: boolean = false;

  constructor(
    private matriculaService: MatriculaService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  editMatricula(editMode: boolean): void {
    this.isEditMode = editMode;
  }

  onSubmitted(matricula: Matricula) {
    this.matricula = matricula;
    if (!this.matricula.id) {
      this.create();
    } else {
      this.update();
    }
  }

  create(): void {
    this.matriculaService.create(this.matricula).subscribe({
      next: data => {
        this.matricula = data;
        this.matriculaChangueEvent.emit(this.matricula);
        this.router.navigate([`matricula/dashboard/edit/${this.matricula.id}`]);
        this.toastrService.success('El elemento fue creado correctamente!', 'Éxito!', {"closeButton": true});
        this.isEditMode = false;
      }
    });
  }

  update(): void {
    this.matriculaService.update(this.matricula.id, this.matricula).subscribe({
      next: data => {
        this.matricula = data;
        this.matriculaChangueEvent.emit(this.matricula);
        this.toastrService.success('El elemento fue actualizado correctamente!', 'Éxito!', {"closeButton": true});
        this.isEditMode = false;
      }
    });
  }
}
