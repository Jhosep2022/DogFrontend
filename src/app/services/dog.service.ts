import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dog } from '../components/models/dog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paginator } from '../components/models/paginator';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private BASE_URL = `${environment.API_URL}/api/dogs`;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  fetchRandomDog(): Observable<Dog> {
    this.spinner.show();
    return this.http.get<any>(`${this.BASE_URL}/fetch`).pipe(
      map(response => response.data)
    );
  }

  listDogsPage(pageNumber: number = 0, pageSize: number = 10): Observable<any> {
    this.spinner.show();
    const params = new HttpParams()
        .set('page', pageNumber.toString())
        .set('size', pageSize.toString());

    return this.http.get<Paginator<Dog>>(`${this.BASE_URL}/list`, { params })
        .pipe(
            tap(() => this.spinner.hide(), response => console.log('API Response:', response)),
            catchError(error => {
                console.error('Error en la solicitud HTTP:', error);
                return [];
            })
        );
}


}
