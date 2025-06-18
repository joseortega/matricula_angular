import {AsyncPipe, CommonModule, DatePipe} from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Representante } from 'app/models/representante';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {MY_DATE_FORMATS} from "../../../my-date-formats";
import {SEXO} from "../../../models/sexo";

@Component({
  selector: 'app-representante-form',
  standalone: true,
  imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        AsyncPipe,
        MatCardModule,
        MatButtonModule,
        MatDatepickerModule,
        MatIconModule
  ],
  templateUrl: './representante-form.component.html',
  styleUrl: './representante-form.component.css',
  providers: [
    DatePipe,
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class RepresentanteFormComponent implements OnChanges {

    @Input() representante: Representante= new Representante();
    @Output() submittedEvent = new EventEmitter<Representante>();
    public sexos: string[]=[SEXO.hombre, SEXO.mujer];

    representanteForm = new FormGroup({
       identificacion: new FormControl<string>('', Validators.required),
       apellidos: new FormControl<string>('', Validators.required),
       nombres: new FormControl<string>('', Validators.required),
       sexo: new FormControl<any>('', Validators.required),
       fecha_nacimiento:  new FormControl<Date | string | null>(null),
       direccion: new FormControl<string>(''),
       telefono: new FormControl<string>(''),
       correo: new FormControl<string>(''),
    });

    constructor(private datePipe: DatePipe){
    }

    submit(): void{
        this.representante = Object.assign(this.representante, this.representanteForm.value);
        this.representante.fecha_nacimiento = this.datePipe.transform( this.representanteForm.get('fecha_nacimiento')?.value, 'yyyy-MM-dd');
        this.submittedEvent.emit( this.representante);
    }

     ngOnChanges(changes: SimpleChanges) {
        if (changes['representante']) {
            if (changes.representante.currentValue) {
                this.representanteForm.patchValue(this.representante);
            }
        }
    }

}
