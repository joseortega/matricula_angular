import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { EstudianteRepresentante } from '../../../models/EstudianteRepresentante';
import { RepresentanteShowComponent } from '../../representante/representante-show/representante-show.component';
import { EstudianteRepresentanteNewComponent } from '../estudiante-representante-new/estudiante-representante-new.component';
import { Representante } from '../../../models/representante';
import { EstudianteRepresentanteService } from '../../../services/estudiante-representante.service';
import { ToastrService } from 'ngx-toastr';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-estudiante-representante-show',
  standalone: true,
  imports: [
            RepresentanteShowComponent,
            EstudianteRepresentanteNewComponent,
            MatButtonModule,
            MatIconModule,
            MatCardModule,
            MatDividerModule,
            MatChipsModule,
            ],
  templateUrl: './estudiante-representante-show.component.html',
  styleUrl: './estudiante-representante-show.component.css'
})
export class EstudianteRepresentanteShowComponent {

   @Input() estudianteRepresentante: EstudianteRepresentante = new EstudianteRepresentante();
   @Output() estudianteRepresentanteDeleteEvent = new EventEmitter<EstudianteRepresentante>();

   @Input() isDelete: boolean = true;
   public isEditing: boolean = false;

   constructor(private toastrService: ToastrService,
               private estudianteRepresentanteService: EstudianteRepresentanteService){
   }

  /**
    * Activa la edición del objeto estudianteRepresentante estableciendo isEditing en true.
    * Esto indica que el objeto está siendo editado.
    */
   edit() {
    this.isEditing = true;
  }

  /**
    * Actualiza los datos del objeto estudianteRepresentante después de una edición.
    * Además, establece isEditing en false para indicar que la edición ha finalizado.
    * @param estudianteRepresentante El objeto estudianteRepresentante editado.
    */
  updateEstudianteRepresentante(estudianteRepresentante: EstudianteRepresentante): void {
        this.estudianteRepresentante = estudianteRepresentante;
        this.isEditing = false;
    }

  /**
    * Actualiza los datos del representante en el objeto estudianteRepresentante después de una edición.
    * Además, establece isEditing en false en caso que estudianteRepresentante se encuentre en modo edición.
    * @param representante El nuevo representante editado.
    */
  updateRepresentante(representante: Representante): void {
        this.estudianteRepresentante.representante = representante;
        this.isEditing = false;
    }

    /**
    * Elimina el objeto estudianteRepresentante actual mediante una solicitud al servicio.
    * Emite un evento después de la eliminación y muestra una notificación de éxito.
    */
    delete(): void{
        this.estudianteRepresentanteService.delete(Number(this.estudianteRepresentante.estudiante.id), Number(this.estudianteRepresentante.id)).subscribe({
            next: data => {
                this.toastrService.success('El elemento fue eliminado correctamente!', 'Éxito!', {"closeButton": true});
                this.estudianteRepresentanteDeleteEvent.emit(this.estudianteRepresentante);
            }
        });
    }
}
