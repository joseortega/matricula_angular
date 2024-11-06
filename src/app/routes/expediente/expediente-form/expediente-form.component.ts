import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Expediente} from "../../../models/expediente";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {Observable} from "rxjs";
import {Nacionalidad} from "../../../models/nacionalidad";
import {Requisito} from "../../../models/requisito";
import {RequisitoService} from "../../../services/requisito.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-expediente-form',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatSelectionList,
    MatListOption,
    AsyncPipe
  ],
  templateUrl: './expediente-form.component.html',
  styleUrl: './expediente-form.component.css'
})
export class ExpedienteFormComponent implements OnChanges{

  @Output() submittedEvent = new EventEmitter<Expediente>();
  @Input() expediente: Expediente = new Expediente();
  public requisitos$: Observable<Requisito[]> = new Observable<Requisito[]>

  expedienteForm = new FormGroup({
    requisitos: new FormControl<Requisito[]>([]),
    observacion: new FormControl<string>(''),
  });

  constructor(private requisitoService: RequisitoService){
  }

  ngOnInit(): void {
    this.requisitos$ = this.requisitoService.getList();
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['expediente']) {
      if (changes.expediente.currentValue) {
        this.expedienteForm.patchValue({
          requisitos: this.expediente.requisitos,
          observacion: this.expediente.observacion || ''
        });
      }
    }
  }

  submit(): void{
    this.expediente = Object.assign(this.expediente, this.expedienteForm.value);
    this.submittedEvent.emit( this.expediente);

    console.log(this.expediente);
  }

  compareObjects(option1: any, option2: any): boolean {
    return option1 && option2 && option1.id === option2.id;
  }

}
