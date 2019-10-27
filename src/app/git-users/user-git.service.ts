import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {UserGit} from './user-git';

export interface SearchData {
  totalCount: number;
  incompleteResults: boolean;
  items: UserGit[];
}

@Injectable({
  providedIn: 'root'
})
export class UserGitService {
  private searchUrl = 'https://api.github.com/search/users';
  private userByLoginUrl = 'https://api.github.com/users';

  errorMassage: string;


  constructor(private http: HttpClient) {}

  getSearchUsers(param: string): Observable<UserGit[]> {
    const option = param ?
      {params: new HttpParams().set('q', param)} : {};

    return this.http.get<SearchData>(this.searchUrl, option)
      .pipe(
        map(val => val.items.slice(0, 20)),
        catchError(this.handleError)
      );
  }

  getUserByLogin(login: string): Observable<UserGit> {
    return this.http.get<UserGit>(`${this.userByLoginUrl}/${login}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error client:', error.error.message);
    } else {
      console.error(`Error backend: code ${error.status}, ` +
        `error: ${error.error}`);
    }
    return throwError('Что-то пошло не так, поробуйте позже');
  };
}
