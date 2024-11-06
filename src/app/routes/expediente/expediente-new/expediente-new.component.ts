import {Component, Input, OnInit} from '@angular/core';
import {ExpedienteFormComponent} from "../expediente-form/expediente-form.component";
import {Expediente} from "../../../models/expediente";
import {Estudiante} from "../../../models/estudiante";
import {ExpedienteService} from "../../../services/expediente.service";
import {ToastrService} from "ngx-toastr";
import {EstudianteRepresentante} from "../../../models/EstudianteRepresentante";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-expediente-new',
  standalone: true,
  imports: [
    ExpedienteFormComponent
  ],
  templateUrl: './expediente-new.component.html',
  styleUrl: './expediente-new.component.css'
})
export class ExpedienteNewComponent implements OnInit {

  @Input() estudiante: Estudiante = new Estudiante();
  public expediente: Expediente = new Expediente();

  constructor(private expedienteService: ExpedienteService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {

    this.getByEstudianteId();
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
      }
    });
  }

  update(): void{
    this.expedienteService.update(Number(this.estudiante.id), this.expediente).subscribe({
      next: data => {
        this.expediente = data;
        this.toastrService.success('El elemento fue actualizado correctamente!', 'Éxito!', {"closeButton": true});
      }
    });
  }

  getByEstudianteId():void{
    this.expedienteService.getByEstudianteId(Number(this.estudiante.id)).subscribe({
      next: data => {
        this.expediente = data;
        console.log(this.expediente);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          // Si no hay expediente, no mostrar error, sólo asignar un mensaje agregamos al expediente nuevo el estudiante actual
          this.toastrService.info('Agregue el expediente académico');
          //en caso que no haya expediente, agregamos al expediente nuevo el estudiante actual
          this.expediente.estudiante = this.estudiante;
        } else {
          // Otros errores
          console.log('Error occurred:', error.message);
          this.toastrService.error('Ocurrió un error al obtener el ex´pediente.');
        }
      }
    });
  }
}
