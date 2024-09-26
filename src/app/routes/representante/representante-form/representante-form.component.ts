import { AsyncPipe, CommonModule } from '@angular/common';
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
  styleUrl: './representante-form.component.css'
})
export class RepresentanteFormComponent implements OnChanges {
    
    @Input() representante: Representante= new Representante();
    @Output() submittedEvent = new EventEmitter<Representante>();
    
    representanteForm = new FormGroup({
       identificacion: new FormControl<string>('', Validators.required),
       apellidos: new FormControl<string>('', Validators.required),
       nombres: new FormControl<string>('', Validators.required),
       lugar_residencia: new FormControl<string>('', Validators.required),
       telefono: new FormControl<string>(''),
       correo: new FormControl<string>(''),
    });
    
    constructor(){
    }
    
    submit(): void{
        this.representante = Object.assign(this.representante, this.representanteForm.value);
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
