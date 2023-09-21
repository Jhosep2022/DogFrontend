import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DogService } from 'src/app/services/dog.service';
import { Dog } from '../models/dog';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html'
})
export class DogListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Dog> = new MatTableDataSource<Dog>([]);
  displayedColumns: string[] = ['idMascotas', 'message'];// Ajusta según tus columnas
  dogs$ = this.dogService.listDogs(); // Asume que listDogs devuelve un Observable
  maxSize: number = 0;
  isLoading: boolean = false;

  constructor(private dogService: DogService) { }

  ngOnInit() {
    this.dogs$
      .subscribe((response) => {
        console.log(response);
        this.maxSize = response.totalElements; // Ajusta según la respuesta de tu API
        this.isLoading = false; // Asume que no hay un indicador de carga en tu respuesta
        this.dataSource.data = response.content; // Ajusta según la respuesta de tu API
      });
  }

  pageChangeEvent($event: PageEvent) {
    console.log($event);
    this.dogService.listDogs($event.pageIndex, 5).subscribe(); // Asume que listDogsPage acepta índice de página y tamaño de página
  }
}
