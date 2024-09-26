import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, signal} from '@angular/core';
import { Estudiante } from '../../../models/estudiante';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EstudianteRepresentante } from '../../../models/EstudianteRepresentante';
import { EstudianteRepresentanteNewComponent } from '../estudiante-representante-new/estudiante-representante-new.component';
import { EstudianteRepresentanteService } from '../../../services/estudiante-representante.service';
import { AsyncPipe } from '@angular/common';
import { EstudianteRepresentanteShowComponent } from '../estudiante-representante-show/estudiante-representante-show.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-estudiante-representante-list',
  standalone: true,
  imports: [
        EstudianteRepresentanteShowComponent,
        EstudianteRepresentanteNewComponent,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        AsyncPipe,
        MatExpansionModule,
        ],
 changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './estudiante-representante-list.component.html',
  styleUrl: './estudiante-representante-list.component.css'
})
export class EstudianteRepresentanteListComponent implements OnInit{
    @Input() estudiante: Estudiante = new Estudiante();

    public estudianteRepresentantes: EstudianteRepresentante[] = [];
    readonly panelOpenState = signal(false);

    //en caso de añadir un nuevo EstudianteRepresentante
    public estudianteRepresentante: EstudianteRepresentante = new EstudianteRepresentante();


    constructor(private estudianteRepresentanteService: EstudianteRepresentanteService){

    }

    /**
     * Método que se ejecuta al inicializar el componente.
     * Obtiene la lista de estudianteRepresentantes y configura el estudianteRepresentante con el estudiante actual.
     */
    ngOnInit(): void {
       this.getEstudianteRepresentantes();

       //en caso de añadir un nuevo EstudianteRepresentante, agregamos eL estudiante actual
       this.estudianteRepresentante.estudiante = this.estudiante;
    }

    /**
     * Agrega un nuevo objeto estudianteRepresentante al arreglo estudianteRepresentantes.
     * @param estudianteRepresentante El objeto estudianteRepresentante que se va a agregar.
     */
    addEstudianteRepresentante(estudianteRepresentante: EstudianteRepresentante) {
        this.estudianteRepresentantes.push(estudianteRepresentante);
    }

    /**
     * Elimina un objeto estudianteRepresentante del arreglo estudianteRepresentantes.
     * @param estudianteRepresentante El objeto estudianteRepresentante que se va a eliminar.
     */
    removeEstudianteRepresentante(estudianteRepresentante: EstudianteRepresentante){

        const idToDelete = estudianteRepresentante.id;

       // Encontrar el índice del objeto que deseas eliminar
        const index = this.estudianteRepresentantes.findIndex(estudianteRepresentante => estudianteRepresentante.id === idToDelete);

        // Si el objeto se encuentra en el array, eliminarlo usando `splice`
        if (index !== -1) {
          this.estudianteRepresentantes.splice(index, 1);
        }
    }

    /**
     * Obtiene la lista de estudianteRepresentantes del servicio para el estudiante actual.
     * La lista obtenida se asigna a la propiedad estudianteRepresentantes del componente.
     */
    getEstudianteRepresentantes(): void {
      this.estudianteRepresentanteService.getList(Number(this.estudiante.id)).subscribe({
        next: data => {
          this.estudianteRepresentantes = data;
        }
      });
    }
}
