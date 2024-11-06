import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RepresentanteService } from '../../../services/representante.service';
import { Representante } from '../../../models/representante';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RepresentanteNewComponent } from '../../representante/representante-new/representante-new.component';
import { EstudianteRepresentante } from '../../../models/EstudianteRepresentante';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Parentesco } from '../../../models/parentesco';
import { notNullValidator } from '../../../validators/not-null-validator';
import { MatSelectModule } from '@angular/material/select';
import { ParentescoService } from '../../../services/parentesco.service';
import {Estudiante} from "../../../models/estudiante";

@Component({
  selector: 'app-estudiante-representante-form',
  standalone: true,
  imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        AsyncPipe,
        MatCardModule,
        MatSlideToggleModule,
        MatSelectModule,
  ],
  templateUrl: './estudiante-representante-form.component.html',
  styleUrl: './estudiante-representante-form.component.css'
})
export class EstudianteRepresentanteFormComponent implements OnInit, OnChanges{

    @Input() estudianteRepresentante: EstudianteRepresentante = new EstudianteRepresentante();
    @Input() isInputRepresentanteDisabled: boolean = false;
    @Output() submittedEvent = new EventEmitter<EstudianteRepresentante>();

    filteredRepresentantes: Observable<Representante[]> | undefined = new Observable<Representante[]>;
    parentescos$: Observable<Parentesco[]> = new Observable<Parentesco[]>;

    estudianteRepresentanteForm = new FormGroup({
       representante: new FormControl<Representante>(new Representante(), [Validators.required, notNullValidator()]),
       parentesco: new FormControl<Parentesco>(new Parentesco(), [Validators.required, notNullValidator()]),
    });

    constructor(private representanteService: RepresentanteService,
                           private parentescoService: ParentescoService,
                           public dialog: MatDialog){
    }

    ngOnInit(): void {
      this.filteredRepresentantes = this.estudianteRepresentanteForm.get('representante')?.valueChanges.pipe(
        startWith(''),
        switchMap(value => this.representanteService.getSearch(value as string || '')),
      );

      this.parentescos$ =  this.parentescoService.getList();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['estudianteRepresentante']) {
            if (changes.estudianteRepresentante.currentValue) {
                this.estudianteRepresentanteForm.patchValue(this.estudianteRepresentante);
                if(this.isInputRepresentanteDisabled === true){
                    this.estudianteRepresentanteForm.get('representante')?.disable();
                }
            }
        }
    }

    displayFn(representante: Representante): any {
        return representante && representante.id ? representante.identificacion+' '+representante.nombres+' '+representante.apellidos : '';
    }

    clearSelectRepresentante(): void{
        this.estudianteRepresentanteForm.get('representante')?.setValue(new Representante());
    }

    submit(): void{
        this.estudianteRepresentante = Object.assign(this.estudianteRepresentante, this.estudianteRepresentanteForm.value);
        this.submittedEvent.emit( this.estudianteRepresentante);
    }

    newRepresentante(): void {
        const dialogRef = this.dialog.open(RepresentanteNewComponent, {
          data: new Representante(),
        });

        dialogRef.afterClosed().subscribe(representante => {
           if(representante?.id){
               this.estudianteRepresentanteForm.get('representante')?.setValue(representante);
           }
        });
    }

    compareObjects(option1: any, option2: any): boolean {
        return option1 && option2 && option1.id === option2.id;
  }
}
