import { Component, OnInit } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';
import { Dog } from '../models/dog';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html'
})
export class DogComponent implements OnInit {
  dog: Dog | null = null;  // Cambiamos a 'dog' y establecemos inicialmente a null

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.addRandomDog();
  }

  addRandomDog() {
    this.dogService.fetchRandomDog().subscribe(response => {
      this.dog = response;  // Asignamos la respuesta a la propiedad 'dog'
    });
  }
}
