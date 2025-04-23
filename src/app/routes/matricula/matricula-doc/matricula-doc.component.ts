import {Component, Input} from '@angular/core';
import {MatriculaService} from "../../../services/matricula.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Matricula} from "../../../models/matricula";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-matricula-doc',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFabButton,
    MatIcon
  ],
  templateUrl: './matricula-doc.component.html',
  styleUrl: './matricula-doc.component.css'
})
export class MatriculaDocComponent {

  @Input() matricula: Matricula = new Matricula();

  constructor(private matriculaService: MatriculaService,
              private toastrService: ToastrService,
              public dialog: MatDialog){
  }


  printCertificadoMatricula(): void{
    this.matriculaService.pdfCertificadoMatricula(Number (this.matricula.id)).subscribe({
      next: data => {
        // Crear una URL para el Blob y forzar la descarga
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'certificado_matricula.pdf';  // Nombre del archivo PDF
        link.click();
      }
    });
  }

  printCertificadoMatriculaAsistencia(): void{
    this.matriculaService.pdfCertificadoMatriculaAsistencia(Number (this.matricula.id)).subscribe({
      next: data => {
        // Crear una URL para el Blob y forzar la descarga
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'certificado_matricula_asistencia.pdf';  // Nombre del archivo PDF
        link.click();
      }
    });
  }

  printCartaAutorizacion(): void{
    this.matriculaService.pdfCartaAutorizacion(Number (this.matricula.id)).subscribe({
      next: data => {
        // Crear una URL para el Blob y forzar la descarga
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'carta_autorizacion.pdf';  // Nombre del archivo PDF
        link.click();
      }
    });
  }

  printActaCompromiso(): void{
    this.matriculaService.pdfActaCompromiso(Number (this.matricula.id)).subscribe({
      next: data => {
        // Crear una URL para el Blob y forzar la descarga
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'acta_compromiso.pdf';  // Nombre del archivo PDF
        link.click();
      }
    });
  }

}
