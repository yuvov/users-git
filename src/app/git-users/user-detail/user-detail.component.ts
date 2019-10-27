import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {UserGit} from '../user-git';
import {UserGitService} from '../user-git.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  user: UserGit;
  routeParam: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserGitService) { }

  ngOnInit() {
    this.routeParam = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.userService.getUserByLogin(params.get('username'))
        )
      ).subscribe((val: UserGit) => this.user = val);
  }
  ngOnDestroy() {
    this.routeParam.unsubscribe();
  }

}
