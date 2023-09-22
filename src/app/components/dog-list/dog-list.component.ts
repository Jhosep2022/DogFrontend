import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  displayedColumns: string[] = ['idMascotas', 'message'];
  dogs$ = this.dogService.listDogsPage();
  maxSize: number = 0;
  isLoading: boolean = false;

  constructor(private dogService: DogService) { }

  ngOnInit() {
    this.loadDogs(0, 5); // Carga inicial con valores predeterminados

  }

  pageChangeEvent($event: PageEvent) {
    this.loadDogs($event.pageIndex, $event.pageSize);
  }

  loadDogs(page: number, size: number) {
    this.dogService.listDogsPage(page, size).subscribe((response) => {
        this.dataSource.data = response.data.content;
        this.maxSize = response.data.totalElements;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
            
        }
    });
}

}
