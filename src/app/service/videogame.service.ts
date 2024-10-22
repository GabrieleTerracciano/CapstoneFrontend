import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideogameService {
  private localApiUrl = 'http://localhost:8080/api/videogames';
  private rawgApiUrl = 'https://api.rawg.io/api/games';
  private apiKey = 'ef3658651dcf4bc9be444420dd0a64fb';

  constructor(private http: HttpClient) {}

  getAllVideogames(): Observable<any> {
    return this.http.get(this.localApiUrl);
  }

  getVideogamesByPlatform(platform: string): Observable<any> {
    const url = `${this.localApiUrl}?platform=${platform}`; 
    return this.http.get(url);
  }

  getVideogameById(id: number): Observable<any> {
    const url = `${this.localApiUrl}/${id}`; 
    return this.http.get(url);
  }

  getVideogamesByName(name: string): Observable<any> {
    const url = `${this.localApiUrl}?name=${name}`;
    return this.http.get(url);
  }

  getRawgVideogameById(id: number): Observable<any> {
    const url = `${this.rawgApiUrl}/${id}?key=${this.apiKey}`;
    return this.http.get(url);
  }
}
