import { Component, OnInit } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';


@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html'
})
export class DogListComponent implements OnInit {
  dogs: any[] = [];

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.loadDogs();
  }

  loadDogs() {
    this.dogService.listDogs().subscribe(response => {
      this.dogs = response;
    });
  }
}
