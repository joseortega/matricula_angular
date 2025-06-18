import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Representante } from 'app/models/representante';
import { RepresentanteNewComponent } from '../representante-new/representante-new.component';
import { MatDialog } from '@angular/material/dialog';
import { EstudianteRepresentante } from 'app/models/EstudianteRepresentante';

@Component({
  selector: 'app-representante-show',
  standalone: true,
  imports: [
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
        ],
  templateUrl: './representante-show.component.html',
  styleUrl: './representante-show.component.css'
})
export class RepresentanteShowComponent implements OnInit{

    @Input() representante: Representante = new Representante();
    @Output() updateRepresentanteEvent = new EventEmitter<Representante>();

    constructor(public dialog: MatDialog){
    }

    ngOnInit(): void {
    }

    /**
     * Abre un diálogo para editar un representante actual.
     * Emite un evento de actualización del representante.
     */
    editRepresentante(): void {
        const dialogRef = this.dialog.open(RepresentanteNewComponent, {
          data: this.representante,
          disableClose: true,
        });

        dialogRef.afterClosed().subscribe(representante => {
           if(representante?.id){
               this.representante = representante;
               this.updateRepresentanteEvent.emit(this.representante);
           }
        });
    }
}
