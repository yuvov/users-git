import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import {catchError, map, tap} from 'rxjs/operators';
import {BehaviorSubject, from, throwError} from 'rxjs';

import {User} from './user';

export const firebaseConfig = {
  apiKey: 'AIzaSyBWuePTxXDO8P-9q1O88V4E5yp0LlMzz9k',
  authDomain: 'user-git.firebaseapp.com',
  databaseURL: 'https://user-git.firebaseio.com',
  projectId: 'user-git',
  storageBucket: 'user-git.appspot.com',
  messagingSenderId: '840444383476',
  appId: '1:840444383476:web:3d12cf3c0283867d62cea1',
  measurementId: 'G-Q04LJWBRGW'
};

export interface ResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signInByEmailUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    + firebaseConfig.apiKey;

  private userSub = new BehaviorSubject<User>(null);
  user = this.userSub.asObservable();
  redirectUrl: string = '/blocks';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  signInByEmail(email: string, password: string) {
    return this.http.post<ResponsePayload>(this.signInByEmailUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleErrorForEmail),
        tap((val: ResponsePayload) => {
          const user: User = new User(email, password, val.idToken);
          this.userSub.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  logout() {
    this.userSub.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);

  }

  signInGitHub() {
    firebase.initializeApp(firebaseConfig);

    const provider = new firebase.auth.GithubAuthProvider();
    const observable = from(firebase.auth().signInWithPopup(provider));
    return observable
      .pipe(
        catchError(this.handleErrorForGit),
        tap(respData => {

          const tokenCredential = respData.credential;
          const user = new User(
           respData.user.email,
            null,
           tokenCredential.accessToken,
           respData.additionalUserInfo.username,
           respData.user.photoURL);
           this.userSub.next(user);
           localStorage.setItem('user', JSON.stringify(user));
        })
    );
  }

  reloadLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return;
    }
    const reloadUser = new User(user.email, user.password, user.idToken, user.login, user.avatar);
    this.userSub.next(reloadUser);

  }

  private handleErrorForEmail(httpError: HttpErrorResponse) {
    let error = 'Неизвестная ошибка';

    switch (httpError.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        error = 'Email не найден';
        break;
      case 'INVALID_PASSWORD':
        error = 'Неверный пароль';
        break;
      case 'USER_DISABLED':
        error = 'Пользователь заблокирован администратором';
        break;
      case 'INVALID_EMAIL':
        error = 'Email неправильного формата';
        break;
    }
    return throwError(error);
  }
  private handleErrorForGit(httpError: HttpErrorResponse) {
    let error = 'Что-то пошло не так, попробуйте позже';
    if (httpError.message) {
      error = httpError.message;
    }
    return throwError(error);
  }
}
