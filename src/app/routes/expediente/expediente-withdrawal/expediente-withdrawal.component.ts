import {ChangeDetectionStrategy, Component, OnInit, viewChild, signal} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { PageHeaderComponent } from "@shared";
import { EstudianteSearchComponent } from "../../estudiante/estudiante-search/estudiante-search.component";
import { Estudiante } from "../../../models/estudiante";
import {EstudianteShowComponent} from "../../estudiante/estudiante-show/estudiante-show.component";
import {
  EstudianteRepresentantePrincipalComponent
} from "../../estudiante-representante/estudiante-representante-principal/estudiante-representante-principal.component";
import {EstudianteRepresentante} from "../../../models/EstudianteRepresentante";
import {EstudianteRepresentanteService} from "../../../services/estudiante-representante.service";
import {ExpedienteNewComponent} from "../expediente-new/expediente-new.component";
import {ExpedienteShowComponent} from "../expediente-show/expediente-show.component";
import {Expediente} from "../../../models/expediente";
import {ExpedienteService} from "../../../services/expediente.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-expediente-withdrawal',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    PageHeaderComponent,
    EstudianteSearchComponent,
    MatExpansionModule,
    MatIconModule,
    EstudianteShowComponent,
    EstudianteRepresentantePrincipalComponent,
    ExpedienteNewComponent,
    ExpedienteShowComponent
  ],
  templateUrl: './expediente-withdrawal.component.html',
  styleUrl: './expediente-withdrawal.component.css'
})
export class ExpedienteWithdrawalComponent implements OnInit{
  accordion = viewChild.required(MatAccordion);
  readonly panelOpenState = signal(false);

  public estudiante: Estudiante = new Estudiante();
  public existeEstudianteRepresentaPrincipal: boolean = false;
  public expediente: Expediente = new Expediente();


  constructor(private estudianteRepresentanteService: EstudianteRepresentanteService,
              private expedienteService: ExpedienteService,
              private toastrService: ToastrService,) {

  }

  ngOnInit() {
    if(this.estudiante.id){
      this.verficaEstudianteRepresentaPrincipal();
    }
  }

  selectEstudianteEvent(estudiante: Estudiante){
    this.estudiante = estudiante;
    if(estudiante.id){
      this.verficaEstudianteRepresentaPrincipal();
    }else{
      this.existeEstudianteRepresentaPrincipal=false;
    }
  }

  updateEstudianteEvent(estudiante: Estudiante) {
    this.estudiante = estudiante;
  }

  newEstudianteRepresentantePrincipalEvent(estudianteRepresentante: EstudianteRepresentante) {
    if(estudianteRepresentante.id){
      this.existeEstudianteRepresentaPrincipal = true;
    }
  }

  verficaEstudianteRepresentaPrincipal(){
    this.estudianteRepresentanteService.existePrincipal(Number(this.estudiante.id)).subscribe({
      next: data => {
        this.existeEstudianteRepresentaPrincipal = data;
      }
    });
  }
}
