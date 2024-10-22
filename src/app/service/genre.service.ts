import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../models/genre.interface';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = 'https://api.rawg.io/api/genres';
  private apiKey = 'ef3658651dcf4bc9be444420dd0a64fb';

  constructor(private http: HttpClient) {}

  getAllGenres(): Observable<Genre[]> {
    const url = `${this.apiUrl}?key=${this.apiKey}`;
    return this.http.get<Genre[]>(url);
  }

  getGenreById(id: number): Observable<Genre> {
    const url = `${this.apiUrl}/${id}?key=${this.apiKey}`;
    return this.http.get<Genre>(url);
  }
}
