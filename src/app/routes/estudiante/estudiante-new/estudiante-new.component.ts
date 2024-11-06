import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Estudiante } from 'app/models/estudiante';
import { EstudianteFormComponent } from '../estudiante-form/estudiante-form.component';
import { MatIconModule } from '@angular/material/icon';
import { EstudianteService } from 'app/services/estudiante.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estudiante-new',
  standalone: true,
  imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
        EstudianteFormComponent,
        MatIconModule
        ],
  templateUrl: './estudiante-new.component.html',
  styleUrl: './estudiante-new.component.css'
})
export class EstudianteNewComponent {

    constructor(public dialogRef: MatDialogRef<EstudianteNewComponent>,
                @Inject(MAT_DIALOG_DATA) public estudiante: Estudiante,
                private estudianteService: EstudianteService,
                private toastrService: ToastrService){
    }

    onClose(): void {
        this.dialogRef.close();
    }

    onSubmitted(estudiante: Estudiante):void {
        this.estudiante = estudiante;
        if(!this.estudiante.id){
            this.create();
        }else{
            this.update();
        }
    }

    create(): void{
        this.estudianteService.create(this.estudiante).subscribe({
            next: data => {
                this.estudiante = data;
                this.toastrService.success('El elemento fue creado correctamente! yuju', 'Éxito!', {"closeButton": true});
                this.dialogRef.close(this.estudiante);
            },
           error: (error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    //A client-side or network error occurred.
                    console.log('An error occurred:', error.error.message);
                    this.toastrService.error(error.error.message, 'An error occurred!');
                } else {
                    //Backend returns unsuccessful response codes such as 404, 500 etc.
                    console.log(error);
                    console.log('Backend returned status code: ', error.status);
                    console.log('Response body:', error.error);
                    this.toastrService.error(error.error.detail, error.error.title);
                }
            }

        });
    }

    update(): void{
        console.log(this.estudiante);
        this.estudianteService.update(Number(this.estudiante.id), this.estudiante).subscribe({
            next: data => {
                this.estudiante = data;
                this.toastrService.success('El elemento fue actualizado correctamente!', 'Éxito!', {"closeButton": true});
                 this.dialogRef.close(this.estudiante);
            },
            error: (error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    //A client-side or network error occurred.
                    console.log('An error occurred:', error.error.message);
                    this.toastrService.error(error.error.message, 'An error occurred!');
                } else {
                    //Backend returns unsuccessful response codes such as 404, 500 etc.
                    console.log(error);
                    console.log('Backend returned status code: ', error.status);
                    console.log('Response body:', error.error);
                    this.toastrService.error(error.error.detail, error.error.title);
                }
            }
        });
    }
}
