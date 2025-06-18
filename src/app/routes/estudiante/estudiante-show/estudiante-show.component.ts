import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Estudiante } from 'app/models/estudiante';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EstudianteNewComponent } from '../estudiante-new/estudiante-new.component';

@Component({
  selector: 'app-estudiante-show',
  standalone: true,
  imports: [
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
        ],
  templateUrl: './estudiante-show.component.html',
  styleUrl: './estudiante-show.component.css'
})
export class EstudianteShowComponent{

    @Input() estudiante: Estudiante = new Estudiante();
    @Output() updateEstudianteEvent = new EventEmitter<Estudiante>();

    constructor(public dialog: MatDialog){
    }

    /**
     * Abre un diálogo para editar el estudiante actual.
     * Emite un evento de actualización del estudiante.
     */
    editEstudiante(): void {
        const dialogRef = this.dialog.open(EstudianteNewComponent, {
          data: this.estudiante,
          disableClose: true,
        });

        dialogRef.afterClosed().subscribe(estudiante => {
           if(estudiante?.id){
               this.estudiante = estudiante;
               this.updateEstudianteEvent.emit(this.estudiante);
           }
        });
    }

}
