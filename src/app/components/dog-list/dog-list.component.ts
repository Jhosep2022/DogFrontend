import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core'; // <-- Añade ChangeDetectorRef aquí
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
  dogs$ = this.dogService.listDogsPage(); // Asume que listDogs devuelve un Observable
  maxSize: number = 0;
  isLoading: boolean = false;

  constructor(private dogService: DogService, private cdRef: ChangeDetectorRef) { } // <-- Añade cdRef aquí

  ngOnInit() {
    this.loadDogs(0, 5); // Carga inicial con valores predeterminados
    this.dataSource.paginator = this.paginator;
  }

  pageChangeEvent($event: PageEvent) {
    console.log($event);
    this.loadDogs($event.pageIndex, $event.pageSize);
  }

  loadDogs(page: number, size: number) {
    this.dogService.listDogsPage(page, size).subscribe((response) => {
        console.log("Respuesta completa:", response);
        console.log("Contenido de la respuesta:", response.data.content);
        this.dataSource.data = response.data.content;
        console.log("DataSource después de la asignación:", this.dataSource.data);
    });
}

}
