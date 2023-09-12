import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dog } from '../components/models/dog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paginator } from '../components/models/paginator';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DogService {
  private BASE_URL = 'http://localhost:8080/api/dogs';

  constructor(private http: HttpClient) { }

  fetchRandomDog(): Observable<Dog> {
    return this.http.get<any>(`${this.BASE_URL}/fetch`).pipe(
      map(response => response.data)
    );
  }

  listDogs(): Observable<Dog[]> {
    return this.http.get<any>(`${this.BASE_URL}/list`).pipe(
      map(response => response.data.content.map((dog: Dog) => ({
        idMascotas: dog.idMascotas,
        message: dog.message,
        status: dog.status
      })))
    );
  }


  listDogsPage(pageNumber: number, pageSize: number): Observable<Paginator<Dog>> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('elements', pageSize.toString());

    return this.http.get<Paginator<Dog>>(`${this.BASE_URL}/list`, { params })
      .pipe(
        tap(response => console.log('API Response:', response)), // Agrega esta línea
        catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          // Puedes agregar lógica adicional de manejo de errores aquí
          return [];
        })
      );
  }

}
