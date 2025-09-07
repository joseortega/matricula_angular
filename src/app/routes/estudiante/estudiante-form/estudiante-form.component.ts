import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Estudiante } from 'app/models/estudiante';
import { MY_DATE_FORMATS } from 'app/my-date-formats';
import {Observable, startWith, switchMap} from 'rxjs';
import { SEXO } from 'app/models/sexo';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UniformeTalla } from 'app/models/uniforme_talla';
import { UniformeTallaService } from 'app/services/uniforme-talla.service';
import { notNullValidator } from 'app/validators/not-null-validator';
import {Pais} from "../../../models/pais";
import {PaisService} from "../../../services/pais.service";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";

@Component({
  selector: 'app-estudiante-form',
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
    MatRadioModule,
    MatIconModule,
    MatSlideToggleModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
  ],
  templateUrl: './estudiante-form.component.html',
  styleUrl: './estudiante-form.component.css',
  providers: [
    DatePipe,
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})

export class EstudianteFormComponent implements OnInit, OnChanges{

    public uniformeTallas$: Observable<UniformeTalla[]> = new Observable<UniformeTalla[]>;
    public sexos: string[]=[SEXO.hombre, SEXO.mujer];

    @Input() estudiante: Estudiante= new Estudiante();
    @Output() submittedEvent = new EventEmitter<Estudiante>();
    filteredPaisNacionalidades: Observable<Pais[]> | undefined = new Observable<Pais[]>;

    estudianteForm = new FormGroup({
       identificacion: new FormControl<string>('', Validators.required),
       apellidos: new FormControl<string>('', Validators.required),
       nombres: new FormControl<string>('', Validators.required),
       sexo: new FormControl<any>('', Validators.required),
       fecha_nacimiento:  new FormControl<Date | string | null>(null,  Validators.required),
       pais_nacionalidad: new FormControl<Pais>(new Pais(), [Validators.required, notNullValidator()]),
       uniforme_talla: new FormControl<UniformeTalla | null>(null),
       direccion: new FormControl<string>(''),
       telefono: new FormControl<string>(''),
       correo: new FormControl<string>(''),
       tiene_discapacidad: new FormControl<boolean>(false),
       observacion: new FormControl<string>(''),
    });

    constructor(private paisService: PaisService,
                private uniformeTallaService: UniformeTallaService,
                private datePipe: DatePipe,
                ){
    }
    ngOnInit(): void {
        this.filteredPaisNacionalidades = this.estudianteForm.get('pais_nacionalidad')?.valueChanges.pipe(
          startWith(''),
          switchMap(value => this.paisService.getSearch(value as string || '')),
        );
       this.uniformeTallas$ = this.uniformeTallaService.getList();
    }

    displayFn(pais_nacionalidad: Pais): any {
      return pais_nacionalidad && pais_nacionalidad.id ? pais_nacionalidad.nombre_comun+' / '+pais_nacionalidad.nacionalidad : '';
    }

    clearSelectPaisNacionalidad(): void{
      this.estudianteForm.get('pais_nacionalidad')?.setValue(null);
    }

    submit(): void{
        this.estudiante = Object.assign(this.estudiante, this.estudianteForm.value);
        this.estudiante.fecha_nacimiento = this.datePipe.transform( this.estudianteForm.get('fecha_nacimiento')?.value, 'yyyy-MM-dd');
        this.submittedEvent.emit( this.estudiante);
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes.estudiante) {
          if (changes.estudiante.currentValue) {
              this.estudianteForm.patchValue(this.estudiante);
          }
      }
    }

    compareObjects(option1: any, option2: any): boolean {
      return option1 && option2 && option1.id === option2.id;
    }
}
