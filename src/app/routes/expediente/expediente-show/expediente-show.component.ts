import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {Estudiante} from "../../../models/estudiante";
import {Expediente} from "../../../models/expediente";
import {ExpedienteService} from "../../../services/expediente.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatChipsModule} from '@angular/material/chips';
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-expediente-show',
  standalone: true,
  imports: [MatListModule, MatCard, MatIcon, MatIconButton, MatCardContent, MatButton, MatChipsModule],
  templateUrl: './expediente-show.component.html',
  styleUrl: './expediente-show.component.css'
})
export class ExpedienteShowComponent implements OnInit{
  @Input() expediente: Expediente = new Expediente();
  @Output() editExpedienteEvent = new EventEmitter<boolean>();
  @Output() changeWithdrawStatusEvent = new EventEmitter<Expediente>();

  constructor(private expedienteService: ExpedienteService,
              private toastrService: ToastrService,
              private dialogService: DialogService)  {

  }

  ngOnInit(): void {
  }

  editExpediente(): void {
    this.editExpedienteEvent.emit(true);
  }

  withdrawExpediente(){
    this.dialogService.openConfirmDialog(
      'Confirma Retiro de Expediente',
      'Estás seguro que deseas retirar el expediente'
    ).subscribe(confirmed =>{
      if(confirmed) {
        this.expedienteService.withdraw(Number(this.expediente.id)).subscribe({
          next: data => {
            this.expediente = data;
            this.changeWithdrawStatusEvent.emit(this.expediente);
            this.toastrService.success('El expediende se ha marcado como retirado!', 'Éxito!',);
          }
        });
      }
    })
  }

  reentryExpediente(){
    this.dialogService.openConfirmDialog(
      'Confirma Reingreso de Expediente',
      'Estas seguro que deseas reingresar el expediente'
    ).subscribe(confirmed=>{
      if(confirmed) {
        this.expedienteService.reentry(Number(this.expediente.id)).subscribe({
          next: data => {
            this.expediente = data;
            this.changeWithdrawStatusEvent.emit(this.expediente);
            this.toastrService.success('El expediende se ha reingresado de nuevo!', 'Éxito!', {"closeButton": true});
          }
        });
      }
    })
  }

  withdrawPrint(){
    this.expedienteService.withdrawPrint(Number(this.expediente.id)).subscribe({
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
