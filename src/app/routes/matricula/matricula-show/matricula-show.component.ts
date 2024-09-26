import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Matricula } from '../../../models/matricula';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatList, MatListItem, MatListItemLine, MatListItemTitle } from '@angular/material/list';

@Component({
  selector: 'app-matricula-show',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatList,
    MatListItem,
    MatListItemLine,
    MatListItemTitle,
  ],
  templateUrl: './matricula-show.component.html',
  styleUrl: './matricula-show.component.css'
})
export class MatriculaShowComponent {

  @Input() matricula: Matricula = new Matricula();
  @Output() editMatriculaEvent = new EventEmitter<boolean>();

  constructor() {
  }
  editMatricula(): void{
    this.editMatriculaEvent.emit(true);
  }
}
