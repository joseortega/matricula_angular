import {Component, Input, OnInit, signal} from '@angular/core';
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
import { Matricula } from 'app/models/matricula';
import { MatriculaService } from 'app/services/matricula.service';
import { ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EstudianteRepresentantePrincipalComponent } from "../../estudiante-representante/estudiante-representante-principal/estudiante-representante-principal.component";
import {MatExpansionModule} from '@angular/material/expansion';
import {EstudianteRepresentanteService} from "../../../services/estudiante-representante.service";
import {MatriculaDocComponent} from "../matricula-doc/matricula-doc.component";
import {MatriculaNewComponent} from "../matricula-new/matricula-new.component";
import {EstudianteRepresentante} from "../../../models/EstudianteRepresentante";
import {ExpedienteNewComponent} from "../../expediente/expediente-new/expediente-new.component";
import {ExpedienteService} from "../../../services/expediente.service";


@Component({
  selector: 'app-matricula-dashboard',
  standalone: true,
  imports: [MatTabsModule,
    PageHeaderComponent,
    EstudianteShowComponent,
    EstudianteSearchComponent,
    EstudianteRepresentanteListComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    EstudianteRepresentantePrincipalComponent,
    MatExpansionModule, MatriculaDocComponent, MatriculaNewComponent, ExpedienteNewComponent,
  ],
  templateUrl: './matricula-dashboard.component.html',
  styleUrl: './matricula-dashboard.component.css'
})
export class MatriculaDashboardComponent implements OnInit {
  public matricula: Matricula = new Matricula();
  //@Input() matricula: Matricula= new Matricula();
  public existeEstudianteRepresentaPrincipal: boolean = false;
  public existeExpediente: boolean = true;

  readonly panelOpenState = signal(false);

  constructor(private matriculaService: MatriculaService,
              private estudianteRepresentanteService: EstudianteRepresentanteService,
              private expedienteService: ExpedienteService,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              public dialog: MatDialog){
  }

  ngOnInit(): void {
    const  matriculaId = Number(this.route.snapshot.paramMap.get('id'));
    //comprobamos matriculaId existe
    if(matriculaId){
      this.getMatricula(matriculaId);
      this.existeEstudianteRepresentaPrincipal=true;
    }
  }

  onMatriculaChangueEvent(matricula: Matricula) {
    this.matricula = matricula;
  }

  getMatricula(matriculaId: number): void{
    this.matriculaService.getById(matriculaId).subscribe({
      next: data => {
        this.matricula = data;
      }
    });
  }

  selectEstudianteEvent(estudiante: Estudiante){
    this.matricula.estudiante = estudiante;
    if(estudiante.id){
      this.verficaEstudianteRepresentaPrincipal();
    }else{
      this.existeEstudianteRepresentaPrincipal=false;
    }
  }

  updateEstudianteEvent(estudiante: Estudiante) {
    this.matricula.estudiante = estudiante;
  }

  newEstudianteRepresentantePrincipalEvent(estudianteRepresentante: EstudianteRepresentante) {
    if(estudianteRepresentante.id){
      this.existeEstudianteRepresentaPrincipal = true;
    }
  }

  verficaEstudianteRepresentaPrincipal(){
    this.estudianteRepresentanteService.existePrincipal(Number(this.matricula.estudiante.id)).subscribe({
      next: data => {
        this.existeEstudianteRepresentaPrincipal = data;
      }
    });
  }

  verificaExpediente(){
    this.expedienteService.exists(Number(this.matricula.estudiante.id)).subscribe({
      next: data => {
        this.existeExpediente = data;
      }
    });
  }

  onTabChange(event: any): void {
    // Verifica que el tab seleccionado sea el de revisión de documentación.
    if (event.tab.textLabel === 'Revisión de documentación') {
      this.verificaExpediente();
    }
  }
}
