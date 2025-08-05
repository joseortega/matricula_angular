import { Component, Inject } from '@angular/core';
import {
            MatDialog,
            MAT_DIALOG_DATA,
            MatDialogRef,
            MatDialogTitle,
            MatDialogContent,
            MatDialogActions,
            MatDialogClose,
          } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RepresentanteFormComponent } from '../representante-form/representante-form.component';
import { Representante } from 'app/models/representante';
import { RepresentanteService } from 'app/services/representante.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-representante-new',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
    RepresentanteFormComponent,
  ],
  templateUrl: './representante-new.component.html',
  styleUrl: './representante-new.component.css'
})
export class RepresentanteNewComponent {

    constructor(public dialogRef: MatDialogRef<RepresentanteNewComponent>,
                @Inject(MAT_DIALOG_DATA) public representante: Representante,
                private representanteService: RepresentanteService,
                private toastrService: ToastrService){
    }

    onClose(): void {
        this.dialogRef.close();
    }

    onSubmitted(representante: Representante){
        this.representante = representante;
        if(!this.representante.id){
            this.create();
        }else{
            this.update();
        }
    }

    create(): void{
        this.representanteService.create(this.representante).subscribe({
            next: data => {
                this.representante = data;
                 this.toastrService.success('El elemento fue creado correctamente!', 'Éxito!', {"closeButton": true});
                this.dialogRef.close(this.representante);
            }
        });
    }

     update(): void{
        this.representanteService.update(Number(this.representante.id), this.representante).subscribe({
            next: data => {
                this.representante = data;
                 this.toastrService.success('El elemento fue actualizado correctamente!', 'Éxito!', {"closeButton": true});
                 this.dialogRef.close(this.representante);
            }
        });
    }

}
