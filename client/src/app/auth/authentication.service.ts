import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from '../people/person';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authenticatedUser: BehaviorSubject<Person | null> = new BehaviorSubject<Person | null>(
    null
  );
  public getAuthenticatedUser: Observable<Person | null> = new Observable();

  constructor(private http: HttpClient, private router: Router) {
    const lsUser = localStorage.getItem('authenticatedUser') || '';
    if (lsUser) {
      const lsUserObject = JSON.parse(lsUser);
      this.authenticatedUser = new BehaviorSubject<Person | null>(lsUserObject);
      this.getAuthenticatedUser = this.authenticatedUser.asObservable();
    }
  }

  public get currentUserValue(): Person | null {
    return this.authenticatedUser.value;
  }

  signIn(credentials: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    });

    return this.http
      .post<any>(
        `/api/auth/sign-in`,
        {},
        {
          headers: headers,
        }
      )
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('authenticatedUser', JSON.stringify(user));
          this.authenticatedUser.next(user);
          return user;
        })
      );
  }

  signOut() {
    // remove user from local storage to sign user out
    localStorage.removeItem('authenticatedUser');
    this.authenticatedUser.next(null);
    this.router.navigate(['/sign-in']);
  }

  isAuthenticated(): boolean {
    const token = this.currentUserValue?.token.split('.')[1];

    if (token) {
      const expiry = JSON.parse(atob(token)).exp;
      const isExpired = Math.floor(Date.now() / 1000) >= expiry;

      if (isExpired) {
        this.signOut();
        return false;
      }

      return true;
    }

    return false;
    // return this.http.get('/api/auth/verify');
  }
}
