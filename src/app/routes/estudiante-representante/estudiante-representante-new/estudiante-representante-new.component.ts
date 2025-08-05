import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EstudianteRepresentanteFormComponent } from '../estudiante-representante-form/estudiante-representante-form.component';
import { EstudianteRepresentante } from '../../../models/EstudianteRepresentante';
import { EstudianteRepresentanteService } from '../../../services/estudiante-representante.service';
import { ToastrService } from 'ngx-toastr';
import { Representante } from '../../../models/representante';

@Component({
  selector: 'app-estudiante-representante-new',
  standalone: true,
  imports: [EstudianteRepresentanteFormComponent],
  templateUrl: './estudiante-representante-new.component.html',
  styleUrl: './estudiante-representante-new.component.css'
})
export class EstudianteRepresentanteNewComponent implements OnInit{

    @Input() estudianteRepresentante: EstudianteRepresentante = new EstudianteRepresentante();
    @Output() newEstudianteRepresentanteEvent = new EventEmitter<EstudianteRepresentante>();
    @Input() isInputRepresentanteDisabled: boolean = false;
    @Input() isPrincipal: boolean = false;


    constructor(private estudianteRepresentanteService: EstudianteRepresentanteService,
                            private toastrService: ToastrService){
    }

    ngOnInit(): void {
    }

    onSubmitted(estudianteRepresentante: EstudianteRepresentante){
        this.estudianteRepresentante = estudianteRepresentante;
        if(!this.estudianteRepresentante.id){
            this.estudianteRepresentante.principal = this.isPrincipal;
            this.create();
        }else{
            this.update();
        }
    }

    create(): void{
        this.estudianteRepresentanteService.create(Number(this.estudianteRepresentante.estudiante.id), this.estudianteRepresentante).subscribe({
            next: data => {

                //asignamos una nueva variable para el objecto creado, con el fin de utilizar el objeto actual, para un nuevo representante
                let newEstudianteRepresentante = new EstudianteRepresentante();
                newEstudianteRepresentante = data;
                this.toastrService.success('El elemento fue creado correctamente!', 'Éxito!', {"closeButton": true});
                this.newEstudianteRepresentanteEvent.emit(newEstudianteRepresentante);

                //asignamos un objeto vacio para un nuevo representante
                this.estudianteRepresentante.representante = new Representante();
            }
        });
    }

     update(): void{
        this.estudianteRepresentanteService.update(Number(this.estudianteRepresentante.estudiante.id), Number(this.estudianteRepresentante.id), this.estudianteRepresentante).subscribe({
            next: data => {
                this.estudianteRepresentante = data;
                this.toastrService.success('El elemento fue actualizado correctamente!', 'Éxito!', {"closeButton": true});
                this.newEstudianteRepresentanteEvent.emit(this.estudianteRepresentante);
            }
        });
    }
}
