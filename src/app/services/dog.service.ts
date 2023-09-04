import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dog } from '../components/models/dog';


@Injectable({
  providedIn: 'root'
})
export class DogService {
  private apiUrl = 'URL'

  constructor(private http: HttpClient) { }

  getAllDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.apiUrl);
  }

  getDogById(id: number): Observable<Dog> {
    return this.http.get<Dog>(this.apiUrl + id);
  }

  updateDog(id: number, dog: Dog): Observable<Dog> {
    return this.http.put<Dog>(this.apiUrl + id, dog);
  }

  deleteDog(id: number): Observable<Dog> {
    return this.http.delete<Dog>(this.apiUrl + id);
  }
}
