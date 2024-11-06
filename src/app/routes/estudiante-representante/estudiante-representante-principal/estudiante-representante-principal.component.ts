import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EstudianteRepresentanteService} from "../../../services/estudiante-representante.service";
import {Estudiante} from "../../../models/estudiante";
import {EstudianteRepresentante} from "../../../models/EstudianteRepresentante";
import {
  EstudianteRepresentanteShowComponent
} from "../estudiante-representante-show/estudiante-representante-show.component";
import {
  EstudianteRepresentanteNewComponent
} from "../estudiante-representante-new/estudiante-representante-new.component";
import {HttpErrorResponse} from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estudiante-representante-principal',
  standalone: true,
  imports: [
    EstudianteRepresentanteShowComponent,
    EstudianteRepresentanteNewComponent
  ],
  templateUrl: './estudiante-representante-principal.component.html',
  styleUrl: './estudiante-representante-principal.component.css'
})
export class EstudianteRepresentantePrincipalComponent {

  @Input() estudiante: Estudiante = new Estudiante();
  @Output() newEstudianteRepresentanteEvent = new EventEmitter<EstudianteRepresentante>();
  public estudianteRepresentante: EstudianteRepresentante = new EstudianteRepresentante();


  constructor(private estudianteRepresentanteService: EstudianteRepresentanteService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getEstudianteRepresentante();
  }

  getEstudianteRepresentante(): void {
    this.estudianteRepresentanteService.getPrincipal(Number(this.estudiante.id)).subscribe({
      next: data => {
        this.estudianteRepresentante = data;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          // Si no hay representante principal, no mostrar error, sólo asignar un mensaje o dejar el objeto vacío
          this.toastrService.info('Agregue el representante principal para este estudiante');
          //en caso que no haya un representante principal, agregamos al nuevo estudianterepresentante el estudiante actual
          this.estudianteRepresentante.estudiante = this.estudiante;
        } else {
          // Otros errores
          console.log('Error occurred:', error.message);
          this.toastrService.error('Ocurrió un error al obtener el representante principal.');
        }
      }
    });
  }

  /**
   * Agrega un nuevo objeto estudianteRepresentante al arreglo estudianteRepresentantes.
   * @param estudianteRepresentante El objeto estudianteRepresentante que se va a agregar.
   */
  newEstudianteRepresentante(estudianteRepresentante: EstudianteRepresentante) {
    this.estudianteRepresentante = estudianteRepresentante;
    this.newEstudianteRepresentanteEvent.emit(this.estudianteRepresentante);
  }

}
