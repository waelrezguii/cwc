import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { Country } from './models/country.model';

@Injectable({
  providedIn: 'root'
})
export class NationsService {

  private apiUrl = 'https://restcountries.com/v2/all';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(response => response.map(item => ({
        name: item.name,
        flag: item.flags.png // Adjust flag field based on API response structure
      }))),
      catchError(error => {
        console.error('Error fetching countries:', error);
        throw error; // You can handle errors as needed
      })
    );
  }
}
