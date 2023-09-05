import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dog } from '../components/models/dog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private BASE_URL = 'http://localhost:8080/api/dogs';

  constructor(private http: HttpClient) { }

  fetchRandomDog(): Observable<Dog> {
    return this.http.get<any>(`${this.BASE_URL}/fetch`).pipe(
      map(response => response.data)  // Mapeamos la respuesta para obtener la propiedad 'data'
    );
  }

  listDogs(): Observable<Dog[]> {
    return this.http.get<any>(`${this.BASE_URL}/list`).pipe(
      map(response => response.data.content.map((dog: Dog) => ({
        id: dog.id,
        message: dog.message,
        status: dog.status
      })))
    );
  }
}
