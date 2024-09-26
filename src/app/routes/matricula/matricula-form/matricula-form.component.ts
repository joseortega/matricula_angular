import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GradoEscolar } from 'app/models/grado-escolar';
import { Jornada } from 'app/models/jornada';
import { Matricula } from 'app/models/matricula';
import { Modalidad } from 'app/models/modalidad';
import { Paralelo } from 'app/models/paralelo';
import { PeriodoLectivo } from 'app/models/periodo-lectivo';
import { GradoEscolarService } from 'app/services/grado-escolar.service';
import { JornadaService } from 'app/services/jornada.service';
import { ModalidadService } from 'app/services/modalidad.service';
import { MatriculaService } from 'app/services/matricula.service';
import { ParaleloService } from 'app/services/paralelo.service';
import { PeriodoLectivoService } from 'app/services/periodo-lectivo.service';
import { Observable } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MY_DATE_FORMATS } from 'app/my-date-formats';
import { DateAdapter } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { notNullValidator } from 'app/validators/not-null-validator';
import { MATRICULA_ESTADO } from 'app/models/matricula-estado';

@Component({
  selector: 'app-matricula-form',
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
        MatDatepickerModule
        ],
  templateUrl: './matricula-form.component.html',
  styleUrl: './matricula-form.component.css',
  providers: [
    DatePipe,
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})

export class MatriculaFormComponent implements OnInit, OnChanges {

    public modalidades$: Observable<Modalidad[]> = new Observable<Modalidad[]>;
    public periodo_lectivos$: Observable<PeriodoLectivo[]> = new Observable<PeriodoLectivo[]>;
    public grado_escolares$: Observable<GradoEscolar[]> = new Observable<GradoEscolar[]>;
    public jornadas$: Observable<Jornada[]> = new Observable<Jornada[]>;
    public paralelos$: Observable<Paralelo[]> = new Observable<Paralelo[]>;
    public estados: string[] = [MATRICULA_ESTADO.preinscripción,
                               MATRICULA_ESTADO.pendiente,
                               MATRICULA_ESTADO.completada
                              ];

    @Input() matricula: Matricula= new Matricula();
    @Output() submittedEvent = new EventEmitter<Matricula>();

    matriculaForm = new FormGroup({
       fecha:  new FormControl<Date | string>({value: new Date(), disabled: true}, Validators.required),
       modalidad: new FormControl<Modalidad>(new Modalidad(), [Validators.required, notNullValidator()]),
       periodo_lectivo: new FormControl<PeriodoLectivo>(new PeriodoLectivo(), [Validators.required, notNullValidator()]),
       grado_escolar: new FormControl<GradoEscolar>(new GradoEscolar(), [Validators.required, notNullValidator()]),
       jornada: new FormControl<Jornada>(new Jornada(), [Validators.required, notNullValidator()]),
       paralelo: new FormControl<Paralelo>(new Paralelo(), [Validators.required, notNullValidator()]),
       estado: new FormControl<any>('', Validators.required),
       observacion: new FormControl<string | undefined>(''),
    });

    constructor(private modalidadService: ModalidadService,
                private periodoLectivoService: PeriodoLectivoService,
                private gradoEscolarService: GradoEscolarService,
                private jornadaService: JornadaService,
                private paraleloService: ParaleloService,
                private datePipe: DatePipe,
                ){
    }
    ngOnInit(): void {

        //Inicializar observables para select median async pipe
        this.modalidades$ = this.modalidadService.getList();
        this.periodo_lectivos$ = this.periodoLectivoService.getList();
        this.grado_escolares$ = this.gradoEscolarService.getList();
        this.jornadas$ = this.jornadaService.getList();
        this.paralelos$ = this.paraleloService.getList();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['matricula']) {
            if (changes.matricula.currentValue) {
                this.matriculaForm.setValue({
                    fecha: this.matricula.fecha,
                    modalidad: this.matricula.modalidad,
                    periodo_lectivo: this.matricula.periodo_lectivo,
                    grado_escolar: this.matricula.grado_escolar,
                    jornada: this.matricula.jornada,
                    paralelo: this.matricula.paralelo,
                    estado: this.matricula.estado,
                    observacion: this.matricula.observacion
                    });
            }
        }
    }

    submit(){
            this.matricula = Object.assign(this.matricula, this.matriculaForm.value);
            const fechaFormat = this.datePipe.transform( this.matriculaForm.get('fecha')?.value, 'yyyy-MM-dd');
            this.matricula.fecha = fechaFormat;
            this.submittedEvent.emit( this.matricula);
    }

    compareObjects(option1: any, option2: any): boolean {
        return option1 && option2 && option1.id === option2.id;
    }
}
