import { Component } from '@angular/core';

@Component({
  selector: 'app-estudiante-list',
  standalone: true,
  imports: [],
  templateUrl: './estudiante-list.component.html',
  styleUrl: './estudiante-list.component.css'
})
export class EstudianteListComponent {
  public pageIndex: number = 0;
  public collectionLength: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 50];
}
