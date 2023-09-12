import { Component, OnInit } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';
import { Dog } from '../models/dog';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html'
})
export class DogListComponent implements OnInit {
  dogs: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.loadDogs();
  }

  loadDogs() {
    this.dogService.listDogsPage(this.currentPage, this.itemsPerPage).pipe(
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        // Puedes agregar lógica adicional de manejo de errores aquí
        return [];
      })
      ).subscribe(response => {
        this.dogs = response.content;
        this.totalItems = response.totalElements;
        console.log(this.dogs); // Para verificar que los datos se asignen correctamente
     });
  }





  onPageChange(page: number) {
    this.currentPage = page;
    this.loadDogs();
  }
}
