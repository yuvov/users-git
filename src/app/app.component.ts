import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';

import {AuthService} from './auth/auth.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService) {}

  ngOnInit() {
    firebase.initializeApp(environment.firebaseConfig);
    this.authService.reloadLogin();
  }
}
