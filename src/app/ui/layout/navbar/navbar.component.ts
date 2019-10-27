import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

import {AuthService} from '../../../auth/auth.service';
import {User} from '../../../auth/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isShow = false;
  isLogin = false;
  user: User;

  constructor(private authService: AuthService,
              private el: ElementRef) { }

  ngOnInit() {
    this.authService.user.subscribe(
      val => {
        if (val) {
          this.isLogin = true;
          this.user = val;
        } else {
          this.isLogin = false;
        }
      }
    );
  }

  show() {
    this.isShow = !this.isShow;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isShow = false;
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
