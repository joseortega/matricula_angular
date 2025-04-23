import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ExpedienteFormComponent} from "../expediente-form/expediente-form.component";
import {Expediente} from "../../../models/expediente";
import {Estudiante} from "../../../models/estudiante";
import {ExpedienteService} from "../../../services/expediente.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {ExpedienteShowComponent} from "../expediente-show/expediente-show.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-expediente-new',
  standalone: true,
  imports: [
    ExpedienteFormComponent,
    ExpedienteShowComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './expediente-new.component.html',
  styleUrl: './expediente-new.component.css'
})
export class ExpedienteNewComponent implements OnInit {

  @Input() estudiante: Estudiante = new Estudiante();
  public expediente: Expediente = new Expediente();
  public isEditMode: boolean = false;

  constructor(private expedienteService: ExpedienteService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getByEstudianteId();
  }

  editExpedienteEvent(editMode: boolean): void {
    this.isEditMode = editMode;
  }

  changeWithdrawStatusEvent(expediente: Expediente): void {
    this.expediente = expediente;
  }

  onSubmitted(expediente: Expediente){
    this.expediente = expediente;
    if(!this.expediente.id){
      this.create();
    }else{
      this.update();
    }
  }

  create(): void{
    this.expedienteService.create(Number(this.estudiante.id),this.expediente).subscribe({
      next: data => {
        this.expediente = data;
        this.toastrService.success('El elemento fue creado correctamente!', 'Éxito!', {"closeButton": true});
        this.isEditMode = false;
      }
    });
  }

  update(): void{
    this.expedienteService.update(Number(this.estudiante.id), this.expediente).subscribe({
      next: data => {
        this.expediente = data;
        this.toastrService.success('El elemento fue actualizado correctamente!', 'Éxito!', {"closeButton": true});
        this.isEditMode = false;
      }
    });
  }

  getByEstudianteId():void{
    this.expedienteService.getByEstudianteId(Number(this.estudiante.id)).subscribe({
      next: data => {
        this.expediente = data;
      },
      error: (error: HttpErrorResponse) => {
        if (!(error.error instanceof ErrorEvent)) {
          this.expediente.estudiante = this.estudiante;
        }
      }
    });
  }
}
