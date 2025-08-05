import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, switchMap} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RepresentanteService } from 'app/services/representante.service';
import { Representante } from 'app/models/representante';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-representante-search',
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
  ],
  templateUrl: './representante-search.component.html',
  styleUrl: './representante-search.component.css'
})
export class RepresentanteSearchComponent implements OnInit, OnChanges{
    
    @Output() representanteSelectEvent = new EventEmitter<Representante>();
    @Input() representante: Representante = new Representante();
    
    representanteControl = new FormControl<string | Representante | undefined >('');
    
    filteredRepresentantes: Observable<Representante[]>=new Observable<Representante[]>;
    
    constructor(private representanteService: RepresentanteService){
    }
    
    ngOnInit() {
      this.filteredRepresentantes = this.representanteControl.valueChanges.pipe(
        startWith(''),
        switchMap(value => this.representanteService.getSearch(value as string || '')),
      );
    }
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes['representante']) {
            if (changes.representante.currentValue) {
                 this.representanteControl.setValue(this.representante);
            }
        }
    }
    
    displayFn(representante: Representante): any {  
        return representante && representante.id ? representante.identificacion+' '+representante.nombres+' '+representante.apellidos : '';
    }
    
    onSelectRepresentante(representante: Representante){
      this.representanteSelectEvent.emit(representante);
  }
  
    clearSelectRepresentante(){
        this.representante = new Representante();
        this.representanteControl.setValue(this.representante);
        this.representanteSelectEvent.emit(this.representante);
    }
  
}
