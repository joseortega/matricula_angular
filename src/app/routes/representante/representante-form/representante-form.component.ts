import {AsyncPipe, CommonModule, DatePipe} from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
import {Pais} from "../../../models/pais";
import {notNullValidator} from "../../../validators/not-null-validator";
import {Observable, startWith, switchMap} from "rxjs";
import {PaisService} from "../../../services/pais.service";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";

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
    MatIconModule,
    MatAutocomplete,
    MatAutocompleteTrigger
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
export class RepresentanteFormComponent implements OnInit, OnChanges {

    filteredPaisNacionalidades: Observable<Pais[]> | undefined = new Observable<Pais[]>;

    @Input() representante: Representante= new Representante();
    @Output() submittedEvent = new EventEmitter<Representante>();
    public sexos: string[]=[SEXO.hombre, SEXO.mujer];

    representanteForm = new FormGroup({
       identificacion: new FormControl<string>('', Validators.required),
       apellidos: new FormControl<string>('', Validators.required),
       nombres: new FormControl<string>('', Validators.required),
       sexo: new FormControl<any>('', Validators.required),
       fecha_nacimiento:  new FormControl<Date | string | null>(null,  Validators.required),
       pais_nacionalidad: new FormControl<Pais>(new Pais(), [Validators.required, notNullValidator()]),
       direccion: new FormControl<string>(''),
       telefono: new FormControl<string>(''),
       correo: new FormControl<string>(''),
    });

    constructor(private datePipe: DatePipe,
                private  paisService: PaisService,){
    }

    ngOnInit() {
      this.filteredPaisNacionalidades = this.representanteForm.get('pais_nacionalidad')?.valueChanges.pipe(
        startWith(''),
        switchMap(value => this.paisService.getSearch(value as string || '')),
      );
    }

    displayFn(pais_nacionalidad: Pais): any {
      return pais_nacionalidad && pais_nacionalidad.id ? pais_nacionalidad.nombre_comun+' / '+pais_nacionalidad.nacionalidad : '';
    }

    clearSelectPaisNacionalidad(): void{
      this.representanteForm.get('pais_nacionalidad')?.setValue(null);
    }

  submit(): void{
        this.representante = Object.assign(this.representante, this.representanteForm.value);
        this.representante.fecha_nacimiento = this.datePipe.transform( this.representanteForm.get('fecha_nacimiento')?.value, 'yyyy-MM-dd');
        this.submittedEvent.emit( this.representante);
    }

     ngOnChanges(changes: SimpleChanges) {
        if (changes.representante) {
            if (changes.representante.currentValue) {
                this.representanteForm.patchValue(this.representante);
            }
        }
    }

    compareObjects(option1: any, option2: any): boolean {
      return option1 && option2 && option1.id === option2.id;
    }

}
