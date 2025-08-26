import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EstudianteService } from 'app/services/estudiante.service';
import { Estudiante } from 'app/models/estudiante';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EstudianteNewComponent } from '../estudiante-new/estudiante-new.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-estudiante-search',
  standalone: true,
  imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatIconModule,
        ReactiveFormsModule,
        AsyncPipe,
        MatButtonModule
  ],
  templateUrl: './estudiante-search.component.html',
  styleUrl: './estudiante-search.component.css'
})
export class EstudianteSearchComponent implements OnInit, OnChanges{

    @Input() estudiante: Estudiante = new Estudiante();
    @Output() selectEstudianteEvent = new EventEmitter<Estudiante>();
    //E caso que el input necesita que esté desactivado
    @Input() isInputSearchDisabled: boolean = false;

    estudianteControl = new FormControl<Estudiante>(new Estudiante());

    filteredEstudiantes: Observable<Estudiante[]>=new Observable<Estudiante[]>;

    constructor(private estudianteService: EstudianteService,
                public dialog: MatDialog){
    }

    ngOnInit() {
        this.filteredEstudiantes = this.estudianteControl.valueChanges.pipe(
          startWith(''),
          switchMap(value => this.estudianteService.getSearch(value as string || '')),
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['estudiante']) {
            if (changes.estudiante.currentValue) {
                this.estudianteControl.setValue(this.estudiante);
                //isInputSearchDisabled es igual a true, el elmento estudianteControl lo hacemos disabled
                if(this.isInputSearchDisabled === true){
                    this.estudianteControl.disable();
                }
            }
        }
    }

    displayFn(estudiante: Estudiante): any {
        return estudiante && estudiante.id ? estudiante.identificacion+' '+estudiante.apellidos+' '+estudiante.nombres : '';
    }

    onSelectEstudiante(estudiante: Estudiante){
          this.selectEstudianteEvent.emit(estudiante);
    }

    clearEstudiante(){
        this.estudiante = new Estudiante();
        this.estudianteControl.setValue(this.estudiante);
        this.selectEstudianteEvent.emit(this.estudiante);
    }

  newEstudiante(): void {
        const dialogRef = this.dialog.open(EstudianteNewComponent, {
          data: new Estudiante(),
          disableClose: true,
        });

        dialogRef.afterClosed().subscribe(estudiante => {
           if(estudiante?.id){
               this.estudiante = estudiante;
               this.selectEstudianteEvent.emit(this.estudiante);
           }
        });
    }

}
