import {Component, Input} from '@angular/core';
import {Matricula} from "../../../models/matricula";

@Component({
  selector: 'app-matricula-admin',
  standalone: true,
  imports: [],
  templateUrl: './matricula-admin.component.html',
  styleUrl: './matricula-admin.component.css'
})
export class MatriculaAdminComponent {

  @Input() matricula: Matricula = new Matricula();

}
