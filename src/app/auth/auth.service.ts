import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthData } from '../models/auth-data.interface';
import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:8080/';
  jwtHelper = new JwtHelperService();

  private authSub = new BehaviorSubject<AuthData | null>(null);
  user$ = this.authSub.asObservable();
  timeOut: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<{message: string}>(`${this.apiURL}auth/login`, data).pipe(
      tap(token => {
        localStorage.setItem('token', token.message);

        const authData: AuthData = {
          accessToken: token.message
        };

        this.authSub.next(authData);
        localStorage.setItem('authData', JSON.stringify(authData));
        this.autoLogout(authData);
        this.router.navigate(['/']);
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  signup(data: User): Observable<any> {
    return this.http.post(`${this.apiURL}auth/register`, data).pipe(
      tap(response => {
        const loginData = { email: data.email, password: data.password };
        this.login(loginData).subscribe(
          loginResponse => {
            console.log('Login response: ', loginResponse);
          },
          loginError => {
            console.error('Login error: ', loginError);
          }
        );
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  logout() {
    this.authSub.next(null);
    this.userService.clearUser();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  restore() {
    const token = this.getToken();
    if (!token) {
      return;
    }
    this.fetchUserDetails(token).subscribe(user => {
      const authData: AuthData = {
        accessToken: token
      };
      this.authSub.next(authData);
      this.userService.setUser(user).subscribe(() => {
        this.autoLogout(authData);
      });
    }, error => {
      console.error('Error fetching user details', error);
      this.logout();
    });
  }

  autoLogout(user: AuthData) {
    const dateExpiration = this.jwtHelper.getTokenExpirationDate(user.accessToken) as Date;
    const millisecondsExp = dateExpiration.getTime() - new Date().getTime();
    this.timeOut = setTimeout(() => {
      this.logout();
    }, millisecondsExp);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  fetchUserDetails(token: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}api/jwt/getUserFromToken`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }
}
