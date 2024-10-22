import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'http://localhost:8080/';

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserFromToken(token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<User>(`${this.apiURL}api/users/currentUser`, { headers })
      .pipe(catchError(this.handleError)); // Gestione errori
  }

  setUser(user: User) {
    this.userSubject.next(user);
    return this.user$;
  }

  clearUser(): void {
    this.userSubject.next(null);
  }

  getUserValue(): User | null {
    return this.userSubject.getValue();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Si è verificato un errore sconosciuto';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Errore: ${error.error.message}`;
    } else {
      errorMessage = `Codice errore: ${error.status}, Messaggio: ${error.message}`;
    }
    console.error('Errore:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  patchUserEmail(currentEmail: string, newEmail: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<User>(
      `${this.apiURL}api/users/${currentEmail}/email`,
      { newEmail },
      { headers }
    ).pipe(catchError(this.handleError));
  }

  patchUserPassword(email: string, newPassword: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<User>(
      `${this.apiURL}api/users/${email}/password`,
      { newPassword },
      { headers }
    ).pipe(catchError(this.handleError));
  }

  patchUserName(email: string, newName: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<User>(
      `${this.apiURL}api/users/${email}/name`,
      { newName },
      { headers }
    ).pipe(catchError(this.handleError));
  }

  patchUserSurname(email: string, newSurname: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<User>(
      `${this.apiURL}api/users/${email}/surname`,
      { newSurname },
      { headers }
    ).pipe(catchError(this.handleError));
  }

  patchUserPoints(email: string, newPoints: number): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<User>(
      `${this.apiURL}api/users/${email}/points`,
      { points: newPoints },
      { headers }
    ).pipe(catchError(this.handleError));
  }
}
