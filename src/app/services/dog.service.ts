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
  private BASE_URL = 'http://localhost:7070/api/dogs';

  constructor(private http: HttpClient) { }

  fetchRandomDog(): Observable<Dog> {
    return this.http.get<any>(`${this.BASE_URL}/fetch`).pipe(
      map(response => response.data)
    );
  }

  listDogs(pageNumber: number = 0, pageSize: number=10): Observable<Paginator<Dog>> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('elements', pageSize.toString());

    return this.http.get<Paginator<Dog>>(`${this.BASE_URL}/list`, {params}).pipe(
      tap(response => console.log('API Response:', response)),
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        return [];
      })
    );
  }


}
